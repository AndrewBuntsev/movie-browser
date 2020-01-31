import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';


const AppStack = createStackNavigator(
  {
    Search: SearchScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Search',
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



const AppContainer = createAppContainer(AppStack);

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



