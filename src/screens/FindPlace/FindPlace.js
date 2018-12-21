import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlace extends Component {
  static options(passProps) {
    return {
      topBar: {
        leftButtons: [
          {
            id: 'buttonOne',
            text: 'ABC'
          }
        ]
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'buttonOne') {
      Navigation.mergeOptions('navigation.drawer.left', {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }

  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });

    Navigation.push(this.props.componentId, {
      component: {
        name: 'awesome-places.PlaceDetailScreen',
        passProps: {
          selectedPlace: selPlace
        },
        options: {
          topBar: {
            title: {
              text: selPlace.name
            }
          }
        }
      }
    })
  }

  render () {
    return (
      <View>
        <PlaceList 
          places={this.props.places} 
          onItemSelected={this.itemSelectedHandler}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps)(FindPlace);