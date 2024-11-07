import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{},
    };
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  
  render() {

    const { user } = this.state; 

    return (
      <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>

      <Text> {auth.currentUser.email} </Text>
      <Text> Username </Text>
      <Text> Bio </Text>



      
      <Text style={styles.text}>Mis posts</Text>
      <Text style={styles.text}>Crear nuevo posts</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => this.logout()} >
        <Text style={styles.buttonText}>Desloguearse</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;