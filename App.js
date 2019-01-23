import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens
Navigation.registerComponentWithRedux(
  'awesome-places.AuthScreen',
  () => AuthScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.SharePlaceScreen',
  () => SharePlaceScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.FindPlaceScreen',
  () => FindPlaceScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.PlaceDetailScreen',
  () => PlaceDetailScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.SideDrawer',
  () => SideDrawer,
  Provider,
  store
);

export default () => Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'awesome-places.AuthScreen'
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: 'Login'
            }
          }
        }
      }
    }
  });
});