import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import * as MoviesAPI from '../omdbapi';


export default class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: ((params && params.title) ? params.title : ''),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };

  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      MoviesAPI.getMovieDetails(navigation.state.params.imdbID).then(result => {
        if (result.Response != 'True') {
          console.error(`Cannot find a movie with the imdbID ${navigation.state.params.imdbID}`);
          return;
        }
        this.setState({ item: result });
      });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const item = this.state.item;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: item.Poster }} style={styles.poster} resizeMode="contain" />





        <View style={styles.title}>
          <Text>
            {item.Title}
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Text>Next Line</Text>
        </View>

        <View style={{ flex: 1, backgroundColor: 'green', alignSelf: 'center' }}>
          <Text>Next Line</Text>
        </View>

        <View style={{ flex: 1, backgroundColor: 'yellow', alignSelf: 'center' }}>
          <Text>Next Line</Text>
        </View>


      </ScrollView>
    );
  }
}

DetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  poster: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '50%',
    width: '100%'
  },
  title: {
    flex: 1,
    fontFamily: 'serif',
    fontWeight: 'bold'
  }
});
