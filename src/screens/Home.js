import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native';
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});