import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config"
import UserProfile from '../components/UserProfile/UserProfile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


logout() {
  auth.signOut();
  this.props.navigation.navigate('Login');
}

render() {
  const { user } = this.state;

  return (
    <View style={styles.container}>
      <UserProfile />

      <View style={styles.userPosts}>
        <Text style={styles.text}>Mis posts</Text>
        <Text style={styles.text}>Crear nuevo post</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e2872',
    marginBottom: 10,
    textAlign: 'center',
  },
  userPosts: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '40%',
    paddingVertical: 10,
    backgroundColor: '#9b4d96',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;