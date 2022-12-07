import axios from "axios";

const getDogs = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/dogs")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOGS", payload: json });
      });
  };
};

const getDogById = (id) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/dogs/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOG", payload: json });
      });
  };
};

const deleteDog = (id) => {
  return async function (dispatch) {
    return axios
      .delete(`http://localhost:3001/dogs/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "DELETE_DOG", payload: json });
      });
  };
};

const getTemperaments = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/temperaments")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTS", payload: json });
      });
  };
};

export { getDogs, getDogById, getTemperaments, deleteDog };
