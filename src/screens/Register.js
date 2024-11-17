import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { auth, db } from "../firebase/config"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      username: "",
      registered: false,
      errormsg: "",
      loading: false,
      bio: "",
      loggedIn: false,

    };
  }

  onSubmit = () => {
    const { email, username, password } = this.state;
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
  }


  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }


  handleSubmit(email, password, bio, username) {
    this.setState({ loading: true, errormsg: '' });
    this.onSubmit();

    if (!password) {
      this.setState({
        errormsg: "Completar password "
      })
      return;
    }
    if (!username) {
      this.setState({
        errormsg: "Completar username"
      })
      return;
    }
    if (!email) {
      this.setState({
        errormsg: "Completar email"
      })
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          db.collection("users").add({
            mail: email,
            bio: bio,
            username: username,
          })
            .then(() => {
              this.setState({ registered: true, errormsg: '', loading: false })
              this.props.navigation.navigate("Login")
            })
            .catch(e => console.log(e.message));
        }
      })
      .catch((error) => this.setState({ errormsg: error.message, loading: false }));
  }



  render() {
    const { email, password, username, loading, bio } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>
        <Text style={styles.description}>Creá tu cuenta</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          onChangeText={text => this.setState({ username: text })}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={password}

        />
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Ingrese biografia"
          onChangeText={text => this.setState({ bio: text })}
          multiline={true}
          numberOfLines={4}
          value={bio}
        />

        <TouchableOpacity style={styles.button}
          onPress={() => this.handleSubmit(email, password, bio, username)}>
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="green" />}
        {this.state.errormsg && <Text style={styles.error}>{this.state.errormsg} </Text>}


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.description}>Ya tengo una cuenta</Text>
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
    backgroundColor: '#e5c3f3',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#9b4d96',
    margin: 10,
    fontFamily: 'PT Serif',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 15,
    color: '#9b4d96',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#9b4d96',
    marginTop: 10,
  },
  input: {
    width: '70%',
    padding: 12,
    textAlign: 'center',
    marginVertical: 10,
    borderWidth: 2.5,
    backgroundColor: '#f2d6f7',
    borderColor: '#9b4d96',
    borderRadius: 8,
    fontFamily: 'Average Sans',
    color: '#9b4d96',
  },
  button: {
    width: '70%',
    paddingVertical: 10,
    backgroundColor: '#9b4d96',
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
    backgroundColor: '#f2d6f7',
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: '#9b4d96',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonSecondaryText: {
    color: '#9b4d96',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: "white",
    margin: 20,
  },

});

export default Register;