import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import ModalScreen from './components/ModalScreen';


const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  handleNavigationChange = (prevState, newState, action) => {
    // console.log(prevState.params);
    // console.log(newState.params);
    // console.log(action);
  };

  render() {
    return <AppContainer onNavigationStateChange={this.handleNavigationChange} />;
  }
}



