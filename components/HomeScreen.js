import React from 'react';
import { View, Text, Button } from 'react-native';


export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => (
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Info"
        color="#fff"
      />
    ),
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    )
  });

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title='Go to Details' onPress={() => this.props.navigation.navigate('Details', {
          itemId: 489,
          shortDescription: 'the details are supposed to be here'
        })} />
      </View>
    );
  }
}

