import { GET_FATTURE } from "../actions";
const initialState = {
  content: null,
};
const fattureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FATTURE:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};
export default fattureReducer;
