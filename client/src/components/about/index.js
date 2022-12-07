import React from "react";
import "./about.css";
import dogBlinking from "../../assets/dog-blinking-one-eye.gif";

function About() {
  return (
    <div className="about-container">
      <h1>About</h1>
      <span>
        <h3>
          La idea general del proyecto es crear una página en la que se puedan
          buscar las distintas razas de perros del mundo, ver información como
          sus Temperamentos y un número estimado de su peso, altura y años de
          vida.
        </h3>
        El proyecto es en formato individual y la temática es seleccionada
        aleatoriamente de una lista de las siguientes temáticas:
      </span>
      <ul className="about-list">
        <li>Perros</li>
        <li>Videojuegos</li>
        <li>Países</li>
        <li>Comidas</li>
        <li>Pokémon</li>
      </ul>
      <span>
        El tiempo para finalizar y entregar el proyecto es de aproximadamente 3
        semanas. <br /> <br /> Este es el resultado final de un largo trabajo.
      </span>
      <h2>¡Espero que les guste!</h2>
      <h4>Creado por: Juan Cruz Vetromile</h4>
      <div>
        <img src={dogBlinking} alt="dog-blinking-one-eye" />
      </div>
    </div>
  );
}

export { About };
