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

                <View style={styles.userInfo}>

                    {loading ? (
                        <ActivityIndicator size='large' color='yellow' />
                    ) : (
                        <><View style={styles.textContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../../assets/userImage.png')}
                                resizeMode='contain'
                            />

                            <Text style={styles.userInfoText}>{user.username}</Text>
                            <Text style={styles.userInfoText}>{auth.currentUser.email}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>
                            <Text style={styles.posts}>Cantidad de posts: {this.props.posts.length} </Text>
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
        padding: 20,
    },
    userInfo: {
        width: '100%',
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#171617',
        marginBottom: 30,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 40,
        alignSelf: 'center',
    },
    textContainer: {
        flex: 1,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        padding: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    bio: {
        backgroundColor: '#ff91f4',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    posts:{
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        padding: 5,
        paddingTop: 15,
    }
});

export default UserProfile;