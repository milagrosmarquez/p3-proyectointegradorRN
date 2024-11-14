import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { db, auth } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postText: "",
      error: "",
    }
  }

  handlePost = () => {
    const { postText } = this.state;

    if (postText === "") {
      this.setState({ error: "Escribe un mensaje" });
      return;
    }

    db.collection("posts")
      .add({
        message: postText,
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        this.setState({ postText: "", error: "" });
        console.log('Se subió el post');
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error al crear post: ", error);
      });
  };

  render() {
    const { postText, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nuevo Post</Text>
        <View style={styles.formPost}>
          <TextInput
            style={styles.input}
            placeholder="Escribir aquí"
            value={postText}
            onChangeText={(text) => this.setState({ postText: text })}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={this.handlePost}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#CCCCFF",
    padding: 20,
  },
  formPost: {
    width: '85%',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#cacfd2',
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  button: {
    width: 150,
    height: 45,
    margin: 20,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#cacfd2',
    backgroundColor: '#f2f4f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default NewPost;