const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Pokemon, Type, pokemon_type} = require('../db');
// const {v4: uuidv4} = require('uuid');

//peticion info de api pokemon
const getApiInfo = async () => {
    try {
        //traigo la info de la url
        let apiURL = (await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40')).data.results;
        // console.log(apiURL, 'apiurl');
        let pokeApi = [];
        for (let i = 0; i < apiURL.length; i++) {
            pokeApi.push(axios.get(apiURL[i].url))
        }

        //mapeo la info
        let apiInfo = (await Promise.all(pokeApi)).map(p => 
            {
            return {
                id: p.data.id,
                name: p.data.name,
                types: p.data.types.map(t => t.type),
                life: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                img: p.data.sprites.other.dream_world.front_default,
            }
        
        });
        // console.log(apiInfo,'apiInfo')
        return apiInfo;


    } catch (err){
        console.log(err)
    }
}



//traigo la info de data base
const getDbInfo = async () => {
    try{
        //retorno  
        return await Pokemon.findAll({
            include: {
                //incluyo la lista Type
                model: Type,
                attributes: ['name'],
                //mediante - comprobacion de atributos
                through: {
                    attributes:[],
                },
            }
        })
    }catch(err){
        return [];
    }
}

//juntamos info de la bd y api
const getAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    // console.log(apiInfo, dbInfo)
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo
}

//PARA RELACIONAR LAS TABLAS DE ID POKEMON Y ID DE TYPE
router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
    try {
        const {pokemonId, typeId} = req.params; // destructuring de datos que me pasan por parametros
        const pokemon = await Pokemon.findByPk(pokemonId); // busco el pokemon por id
        await pokemon.addType(typeId); // agrego el tipo al pokemon usando mixin de secualize
        res.status(201).send(pokemon)
    }
    catch (error) {
        next(error)
    }       
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    let pokeId;
   
    if(id.length > 6) {
        try {
            const resDb= await Pokemon.findByPk(id, {include : Type})
            pokeId = {
                id: resDb.id,
                name: resDb.name,
                types: resDb.types.map(t => t),   
                life: resDb.life,
                attack: resDb.attack,
                defense: resDb.defense,                   
                speed: resDb.speed,
                height: resDb.height,
                weight: resDb.weight,
                img: resDb.image,

            }
            res.json(pokeId)
               
        } catch (error) {
            res.status(404).send({msg:'ID Pokemon not found'})
        }
                    
    } 
        else {
            try {
                const resPoke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                pokeId = {
                    id: resPoke.data.id,
                    name: resPoke.data.name,
                    types: resPoke.data.types.map(t => t.type),
                    life: resPoke.data.stats[0].base_stat,
                    attack: resPoke.data.stats[1].base_stat,
                    defense: resPoke.data.stats[2].base_stat,
                    speed: resPoke.data.stats[5].base_stat,
                    height: resPoke.data.height,
                    weight: resPoke.data.weight,
                    img: resPoke.data.sprites.other.dream_world.front_default,

                }
           
                res.status(200).send(pokeId)
            } 
            catch (err) {
                res.status(404).send({msg:'ID Pokemon not found'})
            }
        }
})

router.get('/', async(req,res)=>{
    const {name}= req.query
    try {
        
        if (name) {
            const pokeBd = await Pokemon.findAll({
                where: {
                    name: name,
                },
                include: {
                    model: Type,
                },
            })
            if (pokeBd != 0) {
                let respBd = pokeBd.map(p => {
                    return {                        
                        id: p.id,
                        name: p.name,
                        types: p.types.map(t => t),
                        life: p.hp,
                        attack: p.attack,
                        defense: p.defense,                        
                        speed: p.speed,
                        height: p.height,
                        weight: p.weight,
                        img: p.image,
                    }
                })

                res.status(200).send(respBd)            
            } else {
                const pokeApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))
                let respApi = [{
                    id: pokeApi.data.id,
                    name: pokeApi.data.name,
                    types: pokeApi.data.types.map(t => t.type),
                    life: pokeApi.data.stats[0].base_stat,
                    attack: pokeApi.data.stats[1].base_stat,
                    defense: pokeApi.data.stats[2].base_stat,
                    speed: pokeApi.data.stats[5].base_stat,
                    height: pokeApi.data.height,
                    weight: pokeApi.data.weight,
                    img: pokeApi.data.sprites.other.dream_world.front_default,
                }]

                res.status(200).send(respApi)
            
            }
        } else {
                          
            try {
                const allPoke = await getAll();
                res.json(allPoke);
            } 
            catch (error) {
                next(error);
            }
        }
    }
    catch (error) {
        res.status(404).send({msg:"Pokemon's name not found"})
    }
  
});



//* PARA AGREGAR LOS POKEMON QUE CREO A LA BASE DE DATOS
router.post('/', async (req, res, next) => {
    try {
        const {name, life, attack, defense, speed, height, weight, img, type} = req.body
        // console.log(name)
        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            type,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            
        })

        await newPokemon.setTypes(type);
        res.send(newPokemon)

    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;