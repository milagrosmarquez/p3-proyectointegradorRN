import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post/Post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    db.collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(posts)
      this.setState({
        posts: posts,
        loading: false,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        
        <FlatList
          data={this.state.posts}
          keyExtractor={post => post.id}
          renderItem={({ item }) => (
           <Post item={item} />
          )}
       />
      
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