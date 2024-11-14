import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase/app";


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            cantidad: this.props.item.data.likes.length,
        };
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.owner)) {
            this.setState({
                like: true
            })
        }
    }


    handleLike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.props.item.data.owner)
        })
            .then(() => this.setState({
                like: true,
                cantidad: this.props.item.data.likes.length,
            }));
    }

    handleUnlike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(this.props.item.data.owner)
        })
            .then(() => this.setState({
                like: false,
                cantidad: this.props.item.data.likes.length,
            }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>{this.props.item.data.message}</Text>
                <Text style={styles.info}>{this.props.item.data.owner}</Text>

                {this.state.like ? (
                    <TouchableOpacity onPress={() => this.handleUnlike()}>
                        <Text style={styles.button}>Ya no me gusta</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.handleLike()}>
                        <Text style={styles.button}>Me gusta </Text>
                    </TouchableOpacity> 
                )}
                <Text style={styles.info}>Likes: {this.state.cantidad}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    message: {
        backgroundColor: '#f2f4f4',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
    },
    info: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        marginBottom: 8,
        width: '100%',
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 25,
        backgroundColor: '#2e2e2e',  
        color: 'white',               
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 25,            
        marginTop: 10,
        alignSelf: 'flex-start',    
        shadowColor: '#000',         
    },
});

export default Post;