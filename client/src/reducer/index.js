const initialState = {
    pokemons: [],
    allPokemons: [],
    pokeDetails: [],
    types: [],
    mensaje:"",
    loading: {
      loading: false,
      msg: "",
    },
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                loading: {
                    loading: false,
                    msg: "",
                }
            };
  
        case "LOADING":
            return {
                ...state,
                loading: {
                    loading: true,
                    msg: action.payload,
                }
            };
  
        case "GET_BY_NAME":
            return {
                ...state,
                pokemons: action.payload,
            };
      
        case "GET_DETAILS":
            return {
                ...state,
                pokeDetails: action.payload,
            };
  
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            };
  
        case "CREATE_POKEMON":
            return {
                ...state,
                mensaje: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                }
            }
  
        case "DB_OR_API":
            const allPokes = state.allPokemons;
            const filteredCreated =
                action.payload === "created"
                ? allPokes.filter(poke => poke.createdInDb) 
                : allPokes.filter(poke => !poke.createdInDb);
            return {
            ...state,
            pokemons: action.payload === 'all' ? state.allPokemons : filteredCreated,
            };
        
        case "FILTER_BY_TYPES":
            const allPoke = state.allPokemons;
            const filteredByTypes =
            allPoke.filter((poke) => poke.types.find((t) => {
                if (t.name === action.payload) {
                    return poke
                } 
            }));
            
            return {
                ...state,
                pokemons: filteredByTypes,
            
            };
        
        case "FILTER_BY_ORDER":
            let orderPoke;
            if (action.payload === "asc") {
                orderPoke = state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
            }

            if (action.payload === "desc") {
            
                orderPoke = state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            }

            if (action.payload === "att-asc") {
                orderPoke = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (a.attack < b.attack) {
                        return -1;
                    }
                    return 0;
                });
            }

            if (action.payload === "att-desc") {
                orderPoke = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (a.attack < b.attack) {
                        return 1;
                    }
                    return 0;
                });
            }
            return { ...state, pokemons: orderPoke };
    
        default:
            return state;
    }
}
  
  export default rootReducer;