/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/beautiful-place.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

const instructions = Platform.select({
  ios: 
    'Press Cmd+R to reload,\n' + 
    'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{  
  state = {
    places: [],
    selectedPlace: null
  };

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(), 
          name: placeName,
          image: {
            uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          } 
        })
      };
    });
  };
  
  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return  place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    });
  };

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find( place => {
          return place.key === key;
        })
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler} />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
