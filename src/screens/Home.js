import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default class Home extends Component {
  render() {

    return (
     
     <View style={styles.container}>
        <Text  style={styles.text} >Home</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
},
});