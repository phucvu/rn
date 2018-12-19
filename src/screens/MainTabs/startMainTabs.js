import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// nav v2
const startTabs = () => {
  Promise.all([
    Icon.getImageSource("md-map", 30),
    Icon.getImageSource("ios-share-alt", 30)
  ]).then( sources => {
    Navigation.setRoot({
      root: {
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
    });
  })
};

export default startTabs;