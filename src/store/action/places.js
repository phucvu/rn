import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    fetch("https://us-central1-awesome-places-f04c4.cloudfunctions.net/storeImage", {
      method: "POST", 
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };

      return fetch("https://awesome-places-1546831277287.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    });
  }
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
};