import React from 'react';
import { View, Text, Button } from 'react-native';

import * as MoviesAPI from '../omdbapi';


export default class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: 'Item ' + ((params && params.imdbID) ? params.imdbID : 'Default'),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };


  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      MoviesAPI.getMovieDetails(navigation.state.params.imdbID).then(result => {
        if (result.Response == 'True') {
          console.log(result);
        } else {
          console.error(`Cannot find a movie with the imdbID ${navigation.state.params.imdbID}`);
        }
      });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        {/* <View>
          <Text>Item ID: {this.props.navigation.state.params.itemId}</Text>
        </View> */}
        {/* <View>
          <Text>Deatils: {this.props.navigation.state.params.shortDescription}</Text>
        </View> */}
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Update details"
          onPress={() => this.props.navigation.setParams({ details: 'Additional Info' })}
        />
      </View>
    );
  }
}

