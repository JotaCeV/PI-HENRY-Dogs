import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteDog, getDogById } from "../../redux/actions";
import "./dog-detail.css";

function DogDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDogById(id));
  }, []);

  const deleteButton = () => {
    dispatch(deleteDog(id));
    alert(`Se ha eliminado correctamente la raza: ${dog.name}`);
    history.push("/Home");
  };

  const previousPageHandler = () => {
    history.push("/Home");
  };

  return (
    <div className="detailpage-container">
      <button onClick={previousPageHandler} id="prevpage-button">
        ↩ Volver{" "}
      </button>
      {dog ? (
        <React.Fragment>
          <div className="upper-page">
            <img src={dog.image} alt={dog.name} />
            <h1>{dog.name}</h1>
          </div>
          <div className="details">
            <h1>Altura</h1>
            <h2>{dog.height}</h2>
            <h1>Peso</h1>
            <h2>{dog.weight}</h2>
            <h1>Años de vida</h1>
            <h2>{dog.life_span}</h2>
          </div>
          <div className="details">
            <h1>Temperamentos</h1>
            <h2>{dog.temperament}</h2>
          </div>
          <button onClick={deleteButton} id="delete-button">
            Eliminar perro
          </button>
        </React.Fragment>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
}

export { DogDetail };
