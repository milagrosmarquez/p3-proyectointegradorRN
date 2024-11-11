import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
 

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
        postText:""
        };
    }



    render() {
        return (
            <View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default Post ;