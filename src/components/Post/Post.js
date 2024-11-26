import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase/app";


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            cantidad: this.props.item.data.likes.length,
            loading: false,
            error:"", 
        };
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.owner)) {
            this.setState({
                like: true
            })
        }
    }


    handleDelete() {
        this.setState({ loading: true });
        db.collection("posts").doc(this.props.item.id).delete()
            .then(() => {
                this.props.onDelete(this.props.item.id);
                this.setState({ loading: false });
            })
            .catch((error) => {
                this.setState({
                    error: "Error al eliminar el post.", loading: false
                  });
            
            });
    }

    handleLike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => this.setState({
                like: true,
                cantidad: this.props.item.data.likes.length,
                
            })
         );
    }

    handleUnlike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => this.setState({
                like: false,
                cantidad: this.props.item.data.likes.length,
            }));
    }

    render() {

        const { cantidad, loading } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.message}>{this.props.item.data.message}</Text>
                <Text style={styles.info}>{this.props.item.data.owner}</Text>

                <View style={styles.likeContainer}>
                    {this.state.like ? (
                        <TouchableOpacity onPress={() => this.handleUnlike()}>
                            <Text style={styles.button}>Ya no me gusta</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => this.handleLike()}>
                            <Text style={styles.button}>Me gusta </Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.likes}>❤️{cantidad}</Text>
                </View>
                {loading ? (
                    <ActivityIndicator size="small" color="blue" style={styles.loading} />
                ) : (
                    this.props.item.data.owner === auth.currentUser.email && (
                        <TouchableOpacity onPress={() => this.handleDelete()}>
                            <Text style={styles.buttonDelete}>Eliminar</Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40, 
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 23,
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
        marginTop: 5,
        width: '100%',
    },
    info: {
        paddingTop: 20,
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        width: '100%',
    },
    buttonDelete: {
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
    button: {
        paddingVertical: 7,
        paddingHorizontal: 25,
        backgroundColor: '#d5cc00',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 25,
        marginTop: 10,
        alignSelf: 'flex-start',
        shadowColor: '#000',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    likes: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
        textAlign: 'center',
        flex: 1,
    }
});

export default Post;