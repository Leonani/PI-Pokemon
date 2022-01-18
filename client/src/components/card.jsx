import React from "react";
import "./CSS/card.css";

export default function Card({ name, img, type }) {
  return (
    <div className="card-container">

        <h3 className="pokemon-name">{name}</h3>
        <img className="pokemon-image" src={`${img}`} alt={name} />
        
        <div className="card-body">
            {Array.isArray(type) ? (
              type.map((tipo) => <h4 className="pokemon-type">{tipo.name}</h4>)
            ) : type ? (
              <h4>{type}</h4>
            ) : (
              <h4>No types</h4>
            )}{" "}
        </div>

    </div>
  );
}