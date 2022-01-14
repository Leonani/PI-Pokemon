import axios from 'axios';

//------------------- unimos back y front ------------------------//1
export function getPokemons () {
    return async function (dispatch) {
        try {
            
            dispatch({ type: "LOADING", payload: 'Buscando Pokémon...' })
            let response = await axios('http://localhost:3001/pokemon')
              dispatch({ type: "GET_POKEMONS", payload: response.data })
        } catch (error) {
            console.log(error)
            
        }         
    }
}


//----------------- obtengo pokemon por nombre -----------------//2
export function getByName (payload) {
    return async function (dispatch) {
        try {
            const pokeName = await axios('http://localhost:3001/pokemon/?name=' + payload);
            dispatch ({
                type: 'GET_BY_NAME',
                payload: pokeName.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}


//----------------- obtengo detalles de pokemon -----------------//3
export function getDetails (id) {
   
    return async function (dispatch) {
        try {
            const pokeDetails = await axios('http://localhost:3001/pokemon/' + id);
            
            dispatch ({
                type: 'GET_DETAILS',
                payload: pokeDetails.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}


//----------------- obtengo los tipos de pokemon -----------------//4
export function getTypes () {
    return async function (dispatch) {
        try {
            const pokeTypes = await axios('http://localhost:3001/type');
            dispatch ({
                type: 'GET_TYPES',
                payload: pokeTypes.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}


//----------------- filtro por tipo de pokemon -----------------//5
export function filterByTypes (payload) {
    
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'FILTER_BY_TYPES',
                payload
            });
        } catch (error) {
            console.log(error)
        }    
      
    }
}


//----------------- filtro para elegir pokemon de Api o BD -----------------//6
export function dbOrApi (payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'DB_OR_API',
                payload,
            });
        } catch (error) {
            console.log(error)
        }
    };
}


//----------------- filtro ascendente o descendente -----------------//7
export function order(payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'ORDER',
                payload,
            });
        }
        catch (error) {
            console.log(error)
        }    
    }
}

    
//----------------- crear pokemon en db -----------------//8
export function createPokemon(pokemon) {
    return async function (dispatch) {
        try {
            dispatch({ type: "LOADING", payload: 'Creando Pokémon...' })
            const newPokemon = await axios.post('http://localhost:3001/pokemon', pokemon);
            dispatch({
                type: "CREATE_POKEMON",
                payload: newPokemon.data 
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}