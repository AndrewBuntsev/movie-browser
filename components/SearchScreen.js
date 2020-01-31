import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import * as MoviesAPI from '../omdbapi';


export default class SearchScreen extends React.Component {

  static navigationOptions = {
    title: 'Search Movie'
  };

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      totalResults: 0
    };
  }

  onSearchTermCahnge = value => {
    this.setState({ searchTerm: value })
    if (value.length > 4) {
      MoviesAPI.searchMovies(value).then(results => {
        if (results.Response == 'True') {
          this.setState({ searchResults: results.Search, totalResults: results.totalResults });
        } else {
          this.setState({ searchResults: [], totalResults: 0 });
        }
      });
    }
  };

  renderSearchItem = ({ item }) => <Text onPress={() => this.props.navigation.navigate('Details', { imdbID: item.imdbID })}>{item.Title}</Text>;

  searchItemKeyExtractor = (item) => {
    return item.imdbID;
  };

  render() {
    return (
      <SafeAreaView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', top: 20 }}>
          <Text>Search Movie Title: </Text>
          <TextInput
            value={this.state.searchTerm}
            onChangeText={this.onSearchTermCahnge}
            style={styles.searchInput} />
        </View>
        <FlatList
          style={{ position: 'absolute', top: 60 }}
          data={this.state.searchResults}
          renderItem={this.renderSearchItem}
          keyExtractor={this.searchItemKeyExtractor}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#EEEEEE',
    borderColor: '#55AA66',
    borderWidth: 2,
    borderRadius: 5,
    width: '50%',
    display: 'flex'
  }
});

