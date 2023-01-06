import React, { useEffect, useState } from "react";
import { SearchBar } from "../search-bar";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import {
  getDogs,
  getDogsByTemperament,
  getTemperaments,
} from "../../redux/actions";
import { Cards } from "../cards";

function Home() {
  const [dogs, setDogs] = React.useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("DEFAULT");
  const [filterTemp, setFilterTemp] = useState("DEFAULT");
  const [dogNotFound, setDogNotFound] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    setDogs(allDogs);
  }, [allDogs]);

  const prevHandler = () => {
    setPage(page - 1);
  };

  const nextHandler = () => {
    setPage(page + 1);
  };

  const onSearch = (searchName) => {
    setDogNotFound(false);
    if (searchName) {
      let filteredDog = dogs.filter((dog) =>
        dog.name.toUpperCase().includes(searchName.toUpperCase())
      );
      if (filteredDog.length < 1) {
        setDogNotFound(true);
      }
      setPage(1);
      return setDogs(filteredDog);
    }

    setDogs(allDogs);
  };

  const onFilter = (e) => {
    dogs.sort();
    if (e.target.value === "asc") {
      setOrder("asc");
      const orderAsc = dogs.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      return setDogs(orderAsc);
    }
    if (e.target.value === "desc") {
      const orderDesc = dogs.sort((a, b) => {
        setOrder("desc");
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
      return setDogs(orderDesc);
    }
    if (e.target.value === "light") {
      const orderLight = dogs.sort((a, b) => {
        setOrder("light");
        let minWeightA = parseInt(a.weight.match(/^\d{1,2}/g));
        let minWeightB = parseInt(b.weight.match(/^\d{1,2}/g));

        if (minWeightA === minWeightB) {
          let maxWeightA = parseInt(a.weight.match(/\d{1,2}$/g));
          let maxWeightB = parseInt(b.weight.match(/\d{1,2}$/g));

          if (maxWeightA > maxWeightB) return 1;
          if (maxWeightA < maxWeightB) return -1;
          return 0;
        }

        if (minWeightA > minWeightB) return 1;
        if (minWeightA < minWeightB) return -1;
        return 0;
      });
      return setDogs(orderLight);
    }
    if (e.target.value === "heavy") {
      const orderHeavy = dogs.sort((a, b) => {
        setOrder("heavy");
        let maxWeightA = parseInt(a.weight.match(/\d{1,2}$/g));
        let maxWeightB = parseInt(b.weight.match(/\d{1,2}$/g));

        if (maxWeightA > maxWeightB) return -1;
        if (maxWeightA < maxWeightB) return 1;
        if (maxWeightA === maxWeightB) {
          let minWeightA = parseInt(a.weight.match(/^\d{1,2}/g));
          let minWeightB = parseInt(b.weight.match(/^\d{1,2}/g));

          if (minWeightA > minWeightB) return -1;
          if (minWeightA < minWeightB) return 1;
          return 0;
        }
        return 0;
      });
      return setDogs(orderHeavy);
    }
  };

  const onFilterTemp = (e) => {
    if (e.target.value !== "DEFAULT") {
      setFilterTemp(e.target.value);
      setPage(1);
      return dispatch(getDogsByTemperament(e.target.value));
    }
    setFilterTemp("DEFAULT");
    return dispatch(getDogs());
  };

  return (
    <div className="home-container">
      <SearchBar onSearch={onSearch} />
      <div className="filter-container">
        <h2>Orden</h2>
        <select value={order} onChange={onFilter}>
          <option value="DEFAULT" disabled hidden>
            Selecciona un orden...
          </option>
          <option value="asc">A-Z ↓</option>
          <option value="desc">Z-A ↓</option>
          <option disabled>-- Peso --</option>
          <option value="light">Mas liviano</option>
          <option value="heavy">Mas pesado</option>
        </select>
        <h2>Temperamentos</h2>
        <select value={filterTemp} onChange={onFilterTemp}>
          <option value="DEFAULT" disabled hidden>
            Selecciona un temperamento...
          </option>
          <option value="DEFAULT">-- Ninguno --</option>
          {allTemperaments?.map((temp) => (
            <option value={temp.id}>{temp.name}</option>
          ))}
        </select>
      </div>
      <div className="page-number">
        <button onClick={() => prevHandler()} disabled={page === 1}>
          ◀
        </button>
        <h1>{page}</h1>
        <button onClick={() => nextHandler()} disabled={page === 22}>
          ▶
        </button>
      </div>
      <div className="home-card-container">
        <Cards data={dogs?.slice((page - 1) * 8, page * 8)} />
        {dogNotFound ? <h1>No se ha encontrado el perro</h1> : ""}
      </div>
    </div>
  );
}

export { Home };
