import React from "react";
import { Card } from "../card";
import "./cards.css";

function Cards({ data }) {
  return (
    <div className="cards-container">
      {data?.map((dog) => (
        <Card id={dog.id} image={dog.image} name={dog.name} />
      ))}
    </div>
  );
}

export { Cards };
