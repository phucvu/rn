import React, { Component } from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { addPlace, startAddPlace } from '../../store/action/index';

import Icon from 'react-native-vector-icons/Ionicons';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

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
  };

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    })
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  };

  componentWillMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.placeAdded) {
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex: 1
        }
      });

      this.props.onStartAddPlace();
    }
  }

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
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    });
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    console.log("this.state.placeName.value", this.state.controls.image.value);
    
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value
      );
      this.reset();
      this.imagePicker.reset();
      this.locationPicker.reset();
  }

  render () {
    let submitButton = (<Button 
      title="Share a Place" 
      onPress={this.placeAddedHandler} 
      disabled={
        !this.state.controls.placeName.valid || 
        !this.state.controls.location.valid ||
        !this.state.controls.image.valid
      }
    />);

    if (this.props.isLoading)  {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText> 
            <HeadingText>Share a Place with us!!</HeadingText> 
          </MainText>
          <PickImage 
            onImagePicked={this.imagePickedHandler} 
            ref={ref => this.imagePicker = ref} />
          <PickLocation 
            onLocationPick={this.locationPickedHandler}
            ref={ref => this.locationPicker = ref} />
          <PlaceInput
            placeData={this.state.controls.placeName} 
            onChangeText={this.placeNameChangeHandler} 
          />
          <View style={styles.button}>
            {submitButton}
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);