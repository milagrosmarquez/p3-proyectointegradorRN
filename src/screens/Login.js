import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      loggedIn: false,
      errormsg: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }


  handleSubmit(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true, errormsg: '' });
      })
      .catch((error) => {
        this.setState({ errormsg: error.message });
      });
  }


  render() {
    const { email, password,  errormsg } = this.state;
   

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Inicio</Text>
        <Text style={styles.description}>¡Bienvenido!</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => this.handleSubmit(email, password)}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        {errormsg && <Text>{errormsg}</Text>}
        <Text style={styles.paragraph}>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.buttonSecondaryText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3baff',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0056b3',
    margin: 10,
    fontFamily: 'PT Serif',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 15,
    color: '#0073e6',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#0073e6',
    marginTop: 10,
  },
  input: {
    width: '70%',
    padding: 12,
    textAlign: 'center',
    marginVertical: 10,
    borderWidth: 2.5,
    backgroundColor: '#e6f3ff',
    borderColor: '#0056b3',
    borderRadius: 8,
    fontFamily: 'Average Sans',
    color: '#0056b3',
  },
  button: {
    width: '70%',
    paddingVertical: 10,
    backgroundColor: '#0056b3',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSecondary: {
    width: '70%',
    paddingVertical: 10,
    backgroundColor: '#e6f3ff',
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: '#0056b3',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonSecondaryText: {
    color: '#0056b3',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: "white",
    margin: 20,
  }
});

export default Login;