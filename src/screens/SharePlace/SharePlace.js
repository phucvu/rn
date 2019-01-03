import React, { Component } from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { addPlace } from '../../store/action/index';

import Icon from 'react-native-vector-icons/Ionicons';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlace extends Component {
  state = {
    placeName: ""
  };
  
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
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  };

  componentDidMount() {
    // load icon to react native navigation using icon... 
    Promise.all([
      Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then( sources => {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          leftButtons: [
            {
              id: 'buttonOne',
              text: 'ABC',
              icon: sources[0]
            }
          ]
        }
      });
    })
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'buttonOne') {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName);
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText> 
            <HeadingText>Share a Place with us!!</HeadingText> 
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
          <View style={styles.button}>
            <Button title="Share a Place" onPress={this.placeAddedHandler}></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};

export default connect(null, mapDispatchToProps)(SharePlace);