import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// nav v2
const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share-alt", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
  ]).then( sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              id: 'navigation.drawer.left',
              name: 'awesome-places.SideDrawer'
            }
          },
          center: {
            bottomTabs: {
              children: [{
                stack: {
                  children: [{
                    component: {
                      name: 'awesome-places.SharePlaceScreen',
                      options: {
                        topBar: {
                          title: {
                            text: 'Tab 1'
                          }
                        },
                        bottomTab: {
                          text: 'Tab 1',
                          icon: sources[0]
                        }
                      }
                    }
                  }]
                }
              }, {
                stack: {
                  children: [{
                    component: {
                      name: 'awesome-places.FindPlaceScreen',
                      options: {
                        topBar: {
                          title: {
                            text: 'Tab 2'
                          }
                        },
                        bottomTab: {
                          text: 'Tab 2',
                          icon: sources[1],
                          testID: 'SECOND_TAB_BAR_BUTTON'
                        }
                      }
                    }
                  }]
                }
              }]
            }
          }
        }
      }
    });
  })
};

export default startTabs;