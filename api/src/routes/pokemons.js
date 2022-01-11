const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Pokemon, Type, pokemon_type} = require('../db');

//peticion info de api pokemon
const getApiInfo = async () => {
    try {
        //traigo la info de la url
        const apiURL = (await axios('https://pokeapi.co/api/v2/pokemon/?limit=40')).data.results;
        // console.log(apiURL.data.results, 'apiurl');
        let pokeApi = [];
        for (let i = 0; i < apiURL.length; i++) {
            pokeApi.push(axios(apiURL[i].url))
        }

        //mapeo la info
        const apiInfo = (await Promise.all(pokeApi)).map(p => 
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
                image: p.data.sprites.other.dream_world.front_default,
            }
        
        });
        return apiInfo;


    } catch (err){
        return [];
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

module.exports = router;