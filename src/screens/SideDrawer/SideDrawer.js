import React, { Component } from 'react';
import { Platform, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { authLogout } from '../../store/action/index';

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 }
        ]} 
      >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawItem}>
            <Icon 
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30} 
              color='#bbb' 
              style={styles.drawItemIcon} />
            <Text>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 52,
    backgroundColor: "white",
    flex: 1
  },
  drawItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#eee"
  },
  drawItemIcon: {
    marginRight: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
}

export default connect(null, mapDispatchToProps)(SideDrawer);