import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import * as MoviesAPI from '../omdbapi';
import Rating from './Rating';


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

    const internetMovieRating = item.Ratings ? item.Ratings.find(r => r.Source == 'Internet Movie Database') : null;
    const rottenTomatoesRating = item.Ratings ? item.Ratings.find(r => r.Source == 'Rotten Tomatoes') : null;

    return (item.Title ?
      <ScrollView contentContainerStyle={styles.container}>

        <Image source={{ uri: item.Poster }} style={styles.poster} resizeMode="contain" />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            {`${item.Title} (${item.Year})`}
          </Text>

          <View style={styles.paragraph}>
            <Text>{`${item.Rated}, ${item.Runtime}`}</Text>
          </View>

          <View style={styles.paragraph}>
            <Text style={styles.plot}>{item.Plot}</Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              <Text style={styles.paragraphTitle}>{'Genre: '}</Text>
              <Text>{item.Genre}</Text>
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              <Text style={styles.paragraphTitle}>{'Country: '}</Text>
              <Text>{item.Country}</Text>
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              <Text style={styles.paragraphTitle}>{'Actors: '}</Text>
              <Text>{item.Actors}</Text>
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              <Text style={styles.paragraphTitle}>{'Director: '}</Text>
              <Text>{item.Director}</Text>
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              <Text style={styles.paragraphTitle}>{'Writer: '}</Text>
              <Text>{item.Writer}</Text>
            </Text>
          </View>

          {item.imdbRating &&
            <View style={styles.paragraph}>
              <Rating title={`IMDB Rating: ${item.imdbRating}`} width={Math.ceil(parseFloat(item.imdbRating) * 10)}>
              </Rating>
            </View>
          }

          {internetMovieRating &&
            <View style={styles.paragraph}>
              <Rating title={`Internet Movie Database: ${internetMovieRating.Value}`} width={Math.ceil(eval(internetMovieRating.Value) * 100)}>
              </Rating>
            </View>
          }

          {rottenTomatoesRating &&
            <View style={styles.paragraph}>
              <Rating title={`Rotten Tomatoes: ${rottenTomatoesRating.Value}`} width={parseInt(rottenTomatoesRating.Value.substring(0, rottenTomatoesRating.Value.length - 1))}>
              </Rating>
            </View>
          }

        </View>



      </ScrollView> : <View></View>
    );
  }
}

DetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems: 'stretch'
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
  detailsContainer: {
    //flex: 1,
    marginTop: 400,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 22
  },
  paragraph: {
    marginTop: 10,
    // flexDirection: 'row'
  },
  paragraphTitle: {
    fontWeight: 'bold'
  },
  plot: {
    fontStyle: 'italic'
  }
});
