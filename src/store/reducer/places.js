import { ADD_PLACE, DELETE_PLACE } from '../action/actionTypes';

initialState = {
  places: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(), 
          name: action.placeName,
          image: {
            uri: action.image.uri
          },
          location: action.location
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return  place.key !== action.placeKey;
        })
      };
    default: 
      return state
  }
};

export default reducer;