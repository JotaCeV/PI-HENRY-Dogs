import React, { useEffect, useState } from "react";
import { SearchBar } from "../search-bar";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getDogs } from "../../redux/actions";
import { Cards } from "../cards";

function Home() {
  const [dogs, setDogs] = React.useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("DEFAULT");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const allDogs = useSelector((state) => state.dogs);

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
    if (searchName) {
      let filteredDog = dogs.filter((dog) =>
        dog.name.toUpperCase().includes(searchName.toUpperCase())
      );
      setPage(1);
      return setDogs(filteredDog);
    }
    setDogs(allDogs);
  };

  const onFilter = (e) => {
    if (e.target.value === "asc") {
      setOrder("asc");
      const orderAsc = dogs.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      setDogs(orderAsc);
    }
    if (e.target.value === "desc") {
      const orderDesc = dogs.sort((a, b) => {
        setOrder("desc");
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
      setDogs(orderDesc);
    }
  };

  return (
    <div className="home-container">
      <SearchBar onSearch={onSearch} />
      <div>
        <select value={order} onChange={onFilter}>
          <option value="DEFAULT" disabled>
            Selecciona un orden...
          </option>
          <option value="asc">A-Z ↓ - Ascendente</option>
          <option value="desc">Z-A ↓ - Descendente</option>
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
      <div>
        <Cards data={dogs?.slice((page - 1) * 8, page * 8)} />
      </div>
    </div>
  );
}

export { Home };
