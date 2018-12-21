import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/action/index';

class SharePlace extends Component {
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

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  }

  render () {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};

export default connect(null, mapDispatchToProps)(SharePlace);