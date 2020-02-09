import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

import * as MoviesAPI from '../omdbapi';
import SearchResultItem from './SearchResultItem';


export default class SearchScreen extends React.Component {

  static navigationOptions = {
    title: 'Movie Explorer'
  };

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      totalResults: 0,
      currentPage: 0,
    };
  }

  //Clears the results view
  clearResults = () => this.setState({ searchResults: [], totalResults: 0, currentPage: 0 });

  //Handles the search input text change event, tryes to find results
  onSearchTermChange = async value => {
    this.setState({ searchTerm: value });

    //Clear search results if short search term
    if (value.length <= 4) {
      this.clearResults();
      return;
    }

    //Retrieve the first chunk
    const firstChunk = await MoviesAPI.searchMovies(value, 1);
    if (firstChunk.Response != 'True') {
      this.clearResults();
      return;
    }

    //Display the first chunk
    this.setState({ searchResults: firstChunk.Search, totalResults: firstChunk.totalResults, currentPage: 1 });
  };

  //Loads the next data chunck
  loadChunk = async () => {
    //Calculate total page number
    const totalPages = Math.ceil(parseInt(this.state.totalResults) / 10);

    //If it is the very bottom do nothing
    if (totalPages == this.state.currentPage) return;

    //Otherwise, load the next page
    const nextChunk = await MoviesAPI.searchMovies(this.state.searchTerm, this.state.currentPage + 1);
    if (nextChunk.Response != 'True') return;
    this.setState(state => ({ searchResults: [...state.searchResults, ...nextChunk.Search], currentPage: state.currentPage + 1 }));
  };

  // //Determines is the scroll view
  // isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  //   const paddingToBottom = 20;
  //   return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  // };

  //Checks if the ScrollView is close to the bottom, loads the next data chunk
  onScroll = e => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      this.loadChunk();
    }
  };

  render() {
    //Get items with unique imdbID
    const items = this.state.searchResults
      .filter((result, index, arr) => arr.findIndex(el => el.imdbID == result.imdbID) == index)
      .map(result => <SearchResultItem item={result} navigation={this.props.navigation} key={result.imdbID} />);

    return (
      <ScrollView style={styles.container} onScroll={this.onScroll} scrollEventThrottle={500}>
        <View style={styles.searchArea}>
          <Text style={styles.searchTitle}>Search Movie Title: </Text>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchTerm}
            onChangeText={this.onSearchTermChange} />
        </View>
        <View style={styles.resultsArea}>
          {items}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  searchTitle: {
    fontSize: 17
  },
  searchInput: {
    backgroundColor: '#EEEEEE',
    borderColor: '#55AA66',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '50%'
  },

  resultsArea: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10
  }
});

