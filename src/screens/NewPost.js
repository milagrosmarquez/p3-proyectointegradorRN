import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: "",
      error: ""
    };
  }



  handlePost = () => {
    const { postText, error } = this.state;

    if (postText === "") {
      this.setState({ error: "Escribir un mensaje" })
    }

    db.collection("posts")
      .add({
        message: postText,
        email: auth.currentUser.email,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ postText: "" });
        console.log('se subió el post')
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error al crear post: ", error);
      });
  };
  





  render() {
    const { postText } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text} >New Post</Text>
        <View style={styles.formPost}>
          <TextInput
            style={styles.input}
            placeholder="Escribir aquí"
            value={postText}
            onChangeText={text => this.setState({ postText: text })}
          />

          <TouchableOpacity style={styles.button}
            onPress={() => this.handlePost(postText)}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
});

export default NewPost;