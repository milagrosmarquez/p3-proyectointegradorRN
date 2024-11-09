import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Users from '../components/Users/Users';



export default class Home extends Component {
  render() {

    return (
     
     <View style={styles.container}>
        <Text>Home</Text>
        <Users></Users>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#f8ff75",
    padding: 20,
  },
});