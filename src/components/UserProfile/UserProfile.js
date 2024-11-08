import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { auth, db } from "../../firebase/config";


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true,
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot((snapshot) => {
            let users = [];
            snapshot.forEach((doc) => {
                users.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            const filteredUsers = users.filter(user => user.data.mail === auth.currentUser.email);
            const user = filteredUsers.length > 0 ? filteredUsers[0].data : {}; 

            this.setState({
                users: users,
                user: user,
                loading: false,
            });
        });
    }

    render() {
        const { user, loading } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Mi perfil</Text>
                <View style={styles.userInfo}>

                    {loading ? (
                        <ActivityIndicator size='large' color='yellow' />
                    ) : (
                        <>
                            <Image
                                style={styles.image}
                                source={require('../../../assets/userImage.png')}
                                resizeMode='contain'
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.userInfoText}>{user.username}</Text>
                                <Text style={styles.userInfoText}>{auth.currentUser.email}</Text>
                                <Text style={styles.bio}>{user.bio}</Text>
                            </View>
                        </>
                    )}

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
        backgroundColor: '#f5f5f5',
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
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#9b4d96',
    },
    bio: {
        backgroundColor: '#f2d6f7',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    }
});

export default UserProfile;