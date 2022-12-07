const initialState = {
  dogs: [],
  dog: {},
  temperaments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return { ...state, dogs: action.payload };
    case "GET_DOG":
      return { ...state, dog: action.payload };
    case "GET_TEMPERAMENTS":
      return { ...state, temperaments: action.payload };
    default:
      return { ...state };
  }
}

export default reducer;
