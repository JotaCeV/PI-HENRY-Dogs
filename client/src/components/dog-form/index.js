import React, { useEffect, useState } from "react";
import "./dog-form.css";
import axios from "axios";
import { validate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";

function DogForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: "",
  });
  const [errors, setErrors] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const allTemperaments = useSelector((state) => state.temperaments);

  console.log(allTemperaments);
  const HandleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    if (input.name && input.height && input.weight) {
      setCompleted(true);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/dogs", {
      ...input,
      height: `${input.height} Cm`,
      weight: `${input.weight} Kg`,
      life_span: `${input.life_span} Años`,
    });
    alert("Se ha creado el perro correctamente!");
  };

  return (
    <div className="form-container">
      <div className="title-div">
        <h1>Crear Perro</h1>
        <p>
          Completa los espacios vacíos con sus respectivas propiedades para
          crear una raza de perro. Los espacios con <b id="alert">(*)</b> son
          obligatorios.
        </p>
      </div>
      <form className="input-container" onSubmit={HandleSubmit}>
        <div>
          <label>Nombre </label>
          <b id="alert">(*)</b>
          <br />
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => HandleInputChange(e)}
            required
          />
          <p id="alert">{errors.name}</p>
        </div>
        <div>
          <label>Altura </label>
          <b id="alert">(*)</b>
          <br />
          <input
            type="range"
            min={15}
            max={99}
            name="height"
            value={input.height}
            onChange={(e) => HandleInputChange(e)}
          />
          <h3>{input.height} cm</h3>
          <p id="alert">{errors.height}</p>
        </div>

        <div>
          <label>Peso </label>
          <b id="alert">(*)</b>
          <br />
          <input
            type="range"
            min={2}
            max={99}
            name="weight"
            value={input.weight}
            onChange={(e) => HandleInputChange(e)}
          />
          <h3>{input.weight} Kg</h3>
          <p id="alert">{errors.weight}</p>
        </div>
        <div>
          <label>Años de vida </label>
          <br />
          <input
            type="range"
            min={8}
            max={20}
            name="life_span"
            value={input.life_span}
            onChange={(e) => HandleInputChange(e)}
          />
          <h3>{input.life_span} Años</h3>
        </div>
        <div>
          <label>Imagen </label>
          <br />
          <p>Introduzca una URL de la imagen de la raza.</p>
          <input
            autoComplete="off"
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => HandleInputChange(e)}
          />
        </div>

        <div>
          <label>Temperamento </label>
          <b id="alert">(*)</b>
          <p>
            Separe los distintos temperamentos con ", ". Ej: Active, Cautious,
            Generous, Tolerant
          </p>
          <br />
          <input
            autoComplete="off"
            type="text"
            name="temperament"
            value={input.temperament}
            onChange={(e) => HandleInputChange(e)}
            required
          />
          <br />
          <p id="alert">{errors.temperament}</p>
          <h3>Lista de temperamentos</h3>
          <div className="temp-container">
            {allTemperaments?.map((temp) => (
              <h4>{temp.name}</h4>
            ))}
          </div>
        </div>
        <button disabled={!completed} type="submit" id="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
}

export { DogForm };
