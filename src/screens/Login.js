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
      id: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        console.log(user);
      }
    });
  }

  onSubmit = () => {
    const { email, password } = this.state;
    console.log("Email:", email);
    console.log("Password:", password);
  }

  handleSubmit(email, password) {
    this.onSubmit();
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true, errormsg: '', id: response.user.uid });
      })
      .catch((error) => {
        this.setState({ errormsg: error.message });
      });
  }

  render() {
    const { email, password, loggedIn, errormsg } = this.state;

    if (loggedIn) {
      this.props.navigation.navigate('HomeMenu');
      return null; 
    }

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
        backgroundColor: '#f2e6ff',
      },
      heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#7a4fff',
        margin: 10,
        fontFamily: 'PT Serif',
      },
      description: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: 15,
        color: '#9a5dfd',
        textAlign: 'center',
      },
      paragraph: {
        fontSize: 16,
        color: '#9a5dfd',
        marginTop: 10,
      },
      input: {
        width: '70%',
        padding: 12,
        textAlign: 'center',
        marginVertical: 10,
        borderWidth: 2.5,
        backgroundColor: '#e6ccff',
        borderColor: '#7a4fff',
        borderRadius: 8,
        fontFamily: 'Average Sans',
        color: '#7a4fff',
      },
      button: {
        width: '70%',
        paddingVertical: 10,
        backgroundColor: '#7a4fff',
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
        backgroundColor: '#e6ccff',
        borderRadius: 8,
        borderWidth: 2.5,
        borderColor: '#7a4fff',
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonSecondaryText: {
        color: '#7a4fff',
        fontSize: 16,
        fontWeight: '600',
      },
      error: {
        color: "white",
        margin: 20,
      }
});

export default Login;