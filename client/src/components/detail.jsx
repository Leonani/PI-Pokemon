import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";

import pokeLogo from './img/pokemonLogo.png'
import pokeBola from './img/pokebola.png'
import "./CSS/detail.css";

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [details, ] = useState(id);

  useEffect(() => {
    dispatch(getDetails(details));
  }, [dispatch, details]);

  const myDeta = useSelector((state) => state.pokeDetails);
  console.log(myDeta);

  return (
    <div>
      <img className="pokebola" src={pokeBola} alt="Pokebola" />
      <div className="detailContainer">
        <img src={pokeLogo} alt="Logo Pokemon" />
        {myDeta ? (
          <div className="cuadro">
            <h1 className="detailName">{myDeta.name}</h1>
            <div className="grid">
              <div className="imgD">
                <img
                  className="detail-img"
                  src={myDeta.img ? myDeta.img : myDeta.img}
                  alt={myDeta.name}
                />
              </div>
              <div className="dividir"></div>
              <div className="contenido">
                <div className="datoPoke">
                  
                  <p>HP: {myDeta.life} 💖</p>
                  <p>Attack: {myDeta.attack}⚔</p>
                  <p>Defense: {myDeta.defense}🛡</p>
                  <p>Speed: {myDeta.speed}💨</p>
                  <p>Weight: {myDeta.weight}⚖</p>
                  <p>Height: {myDeta.height}🔺</p>
                  
                </div>

                <div className="typeD">
                  {Array.isArray(myDeta.types) ? (
                    myDeta.types.map((t) => (
                      <h3 className="type-list">{t.name} </h3>
                    ))
                  ) : (
                    <h1 className="type-list">Sin Tipos</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
            
        <div >
          <Link to="/home">
            <button className="btback">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}