import React from "react";
import "./CSS/card.css";

export default function Card({ name, img, type }) {
  return (
    <div className="conteiner">
      <div className="card">

        <h3>{name}</h3>

        <div className="wall">          
          <div>
            <img src={`${img}`} alt={name} />
          </div>
        </div>  
        
        <div className="cardType">
          {Array.isArray(type) ? (
            type.map((tipo) => <h4 className="pokemon-type">{tipo.name}</h4>)
            ) : type ? (
              <h4>{type}</h4>
              ) : (
                <h4>No types</h4>
                )}{" "}
        </div>

      </div>
    </div>
  );
}