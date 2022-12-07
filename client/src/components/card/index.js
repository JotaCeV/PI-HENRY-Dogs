import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ id, image, name }) {
  return (
    <React.Fragment>
      <div className="card">
        <Link to={`/Dog/${id}`} className="card-link">
          <img src={image} alt={`${name}`} />
          <h2>{name}</h2>
        </Link>
      </div>
    </React.Fragment>
  );
}

export { Card };
