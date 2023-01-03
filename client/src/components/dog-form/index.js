import React, { useEffect, useState } from "react";
import "./dog-form.css";
import axios from "axios";
import { validate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";

function DogForm() {
  const dispatch = useDispatch();
  const [tempInput, setTempInput] = useState([]);
  // const [buttonState, setButtonState] = useState("button-inactive");
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

  const HandleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    if (input.name && input.height && input.weight && tempInput.length > 0) {
      setCompleted(true);
    }
  };

  const TempsButtons = (e) => {
    if (tempInput.includes(e.target.value)) {
      let filteredTemp = tempInput.filter((temp) => temp !== e.target.value);
      return setTempInput(filteredTemp);
    }
    if (input.name && input.height && input.weight && tempInput.length > 0) {
      setCompleted(true);
    }
    setTempInput([...tempInput, e.target.value]);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let str = tempInput.join(", ");
    setInput((input.temperament = str));

    axios.post("http://localhost:3001/dogs", {
      ...input,
      life_span: `${input.life_span} Años`,
    });
    alert("Se ha creado el perro correctamente!");
    console.log(input);
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
          <br />
          <p id="alert">{errors.temperament}</p>
          <h2>{tempInput.join(", ")}</h2>
          <div className="temp-container">
            {allTemperaments?.map((temp) => (
              <button
                type="button"
                onClick={TempsButtons}
                value={temp.name}
                className="button-inactive"
              >
                {temp.name}
              </button>
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
