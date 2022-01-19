import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getByTypes} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import logoPoke from "./img/pokemonLogo.png";
import "./CSS/created.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required";
    } else if (!input.life || isNaN(input.life)) {
        errors.life = "Life is required";
    } else if (!input.attack || isNaN(input.attack)) {
        errors.attack = "Attack is required";
    } else if (!input.defense || isNaN(input.defense)) {
        errors.defense = "Defense is required";
    } else if (!input.speed || isNaN(input.speed)) {
        errors.speed = "Speed is required";
    } else if (!input.height || isNaN(input.height)) {
        errors.height = "Height is required";
    } else if (!input.weight || isNaN(input.weight)) {
        errors.weight = "Weight is required";
    } else if (!input.type) {
        errors.type = "Type is required";
    }
    return errors;
}

const eliminarSeleccion = (input, sel) => {
  if (input.includes(sel)) {
    const array1 = input.filter((num) => num !== sel);
    return array1;
  } else {
    const array2 = input.concat(sel);
    return array2;
  }
};

export default function Create() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        
        name: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        img:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/509.svg",
        type: [],
    });

    function handleType(event) {
        setInput({
        ...input,
        type: eliminarSeleccion(input.type, event.target.value),
        });
    }

    // function handleChange(event) {
    //     setInput({
    //     ...input,
    //     [event.target.name]: event.target.value,
    //     });
    //     setErrors(
    //     validate({
    //         ...input,
    //         [event.target.name]: event.target.value,
    //     })
    //     );
        
    // }
    const handleChange = event => {
        setInput({
          ...input,
          [event.target.name]: event.target.value.toLowerCase(),
          [event.target.type]: event.target.value,
          [event.target.life]: event.target.value,
          [event.target.attack]: event.target.value,
          [event.target.defense]: event.target.value,
          [event.target.speed]: event.target.value,
          [event.target.height]: event.target.value,
          [event.target.weight]: event.target.value,
          [event.target.img]: event.target.value
    
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]: event.target.value,
            })
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(input,'create')
        dispatch(createPokemon(input));
        alert("Pokemon created");
        setInput({
            name: "",
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            img: "",
            type: [],
        });
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getByTypes());
    },[dispatch]);
    
    return (
        <div className="encierra">
            <div>
                <img className="pokelogo" src={logoPoke} alt="Poke Logo" />
            </div>
            <div>
                <h1 className="titleF">Crea tu Pokemon</h1>
            </div>

            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="containerF">
                    <div className="llenar">
                        <div className="campo">
                            <label className="label">Name</label>
                            <input
                                className="input"
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.name && <p className= 'errores'>{errors.name}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Life</label>
                            <input
                                className="input"
                                type="number"
                                value={input.life}
                                name="life"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.life && <p className= 'errores'>{errors.life}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Attack</label>
                            <input
                                className="input"
                                type="number"
                                value={input.attack}
                                name="attack"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.attack && <p className= 'errores'>{errors.attack}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Defense</label>
                            <input
                                className="input"
                                type="number"
                                value={input.defense}
                                name="defense"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.defense && <p className= 'errores'>{errors.defense}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Speed</label>
                            <input
                                className="input"
                                type="number"
                                value={input.speed}
                                name="speed"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.speed && <p className= 'errores'>{errors.speed}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Height</label>
                            <input
                                className="input"
                                type="number"
                                value={input.height}
                                name="height"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.height && <p className= 'errores'>{errors.height}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Weight</label>
                            <input
                                className="input"
                                type="number"
                                value={input.weight}
                                name="weight"
                                onChange={(event) => handleChange(event)}
                            />
                            {errors.weight && <p className= 'errores'>{errors.weight}</p>}
                        </div>
                        <div className="campo">
                            <label className="label">Image</label>
                            <input
                                className="input"
                                type="url"
                                value={input.img}
                                name="img"
                                onChange={(event) => handleChange(event)}
                            />
                        </div>
                    </div>
                    <div className="chekes">
                        <div className="typeForm">
                            {types.map((t) => (
                                <div className="checkbox-types">
                                    <div className="check">
                                        <input
                                        type="checkbox"
                                        value={t.id}
                                        onChange={(event) => handleType(event)}
                                        />
                                        {t.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            <div className="ulti">
                <div>
                    <button className="btn" type="submit">
                        Crear
                    </button>
                </div>   
                <div>
                    <Link to="/home">
                        <button className="btn">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
            </form>

        
        </div>
    );
}