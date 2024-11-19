import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { auth, db } from "../firebase/config"
import UserProfile from '../components/UserProfile/UserProfile';
import Post from '../components/Post/Post';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      loggedIn: true,
    };
  }


  componentDidMount() {

    auth.onAuthStateChanged(user => {
      if (!user) {
        this.setState({ loggedIn: false });
        this.props.navigation.navigate('Login');
      }
    });

    this.setState({ loading: true });
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt);

        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }



  render() {

    const { loading, posts } = this.state;

    return (


      <View style={styles.containerUser}>
        <Text style={styles.text}>Mi perfil</Text>

        <UserProfile posts={posts} />

        <View style={styles.containerPost}>
          <Text style={styles.text}>Mis posts</Text>

          {posts.length === 0 ? (
            <Text style={styles.noResults}>Aún no hay publicaciones</Text>
          ) : loading ? (
            <ActivityIndicator size="large" color="yellow" />
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(post) => post.id}
              renderItem={({ item }) => <Post item={item} />}
              contentContainerStyle={styles.postsList}
            />
          )}
        </View>


        <TouchableOpacity
          style={styles.button}
          onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerUser: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#ff91f4",
    padding: 20,
  },
  noResults: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
  },
  containerPost: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#ff91f4",
    padding: 20,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#d3aad7',
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 45,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#db2dca',
    backgroundColor: '#ee7be2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;