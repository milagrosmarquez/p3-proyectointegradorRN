import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { auth, db } from "../../firebase/config";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersDb: [],
            filteredUsers: [],
            filterValue: "",
            loading: true,
            filterApplied: false,
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

            const usersDb = users.filter(user => user.data.mail !== auth.currentUser.email);

            this.setState({
                usersDb: usersDb,
                loading: false,
            });
        });
    }

    handleFilter = (text) => {
        const filteredUsers = this.state.usersDb.filter(user =>
            user.data.mail.toLowerCase().includes(text.toLowerCase())
        );

        this.setState({
            filterValue: text,
            filteredUsers: filteredUsers,
            filterApplied: true,
        });
    };

    render() {
        const { usersDb, loading, filteredUsers, filterValue, filterApplied } = this.state;

        return (
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#6c63ff" />
                ) : (
                    <>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar usuario"
                            value={filterValue}
                            onChangeText={this.handleFilter}
                        />

                        {filterApplied && filteredUsers.length === 0 ? (
                            <Text style={styles.noResults}>No existen usuarios para este filtro</Text>
                        ) : (
                            <FlatList
                                data={filteredUsers.length > 0 ? filteredUsers : usersDb}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}>{item.data.username}</Text>
                                        <Text style={styles.userInfoText}>{item.data.mail}</Text>
                                        <Text style={styles.bio}>{item.data.bio}</Text>
                                    </View>
                                )}
                            />
                        )}
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    searchInput: {
        width: '95%',
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6c63ff',
        fontSize: 16,
        color: '#333',
    },
    noResults: {
        textAlign: 'center',
        color: '#d63447',
        fontSize: 16,
        marginTop: 10,
    },
    userInfo: {
        width: '100%',
        padding: 20,
        marginBottom: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6c63ff',
        backgroundColor: '#EAD5F2',
    },
    userInfoText: {
        fontSize: 18,
        color: '#4a47a3',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
        color: '#6a5acd',
        marginTop: 10,
    },
});

export default Users;