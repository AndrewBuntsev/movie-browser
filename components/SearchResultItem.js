import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';


export default class SearchResultItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', { imdbID: item.imdbID, title: item.Title, poster: item.Poster })}>
          <View>
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <View style={styles.titleView}>
              <Text style={styles.title}>
                {item.Title}
              </Text>
              <Text>{`${item.Year} (${item.Type})`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

SearchResultItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column'
  },
  poster: {
    height: 40,
    width: 40
  },
  titleView: {
    marginTop: -40,
    marginLeft: 45
  },
  title: {
    fontFamily: 'serif',
    fontWeight: 'bold'
  }
});

