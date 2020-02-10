import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class Rating extends React.Component {
  render() {
    const color = this.props.width > 80 ? 'green'
      : this.props.width > 60 ? 'yellow'
        : this.props.width > 40 ? 'magenta' : 'red';

    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.props.title}</Text>
        <View style={{ height: 15, backgroundColor: color, width: `${this.props.width}%` }}></View>
      </View>
    );
  }
}

Rating.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

