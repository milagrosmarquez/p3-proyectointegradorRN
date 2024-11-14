import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { auth, db } from "../../firebase/config";

class UserSearch extends Component {
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
        const { usersDb, loading, filteredUsers, filterValue } = this.state;

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

                        {filterValue !== "" && filteredUsers.length === 0 && (
                            <Text style={styles.noResults}>No existen usuarios para este filtro</Text>
                        )}

                        <FlatList
                            data={filterValue === "" ? usersDb : filteredUsers}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.userInfo}>
                                    <Text style={styles.userInfoText}>{item.data.username}</Text>
                                    <Text style={styles.userInfoText}>{item.data.mail}</Text>
                                </View>
                            )}
                        />
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 14,
        marginBottom: 20,
        backgroundColor: 'white',
        color: '#333',
        textAlign: 'center',
    },
    noResults: {
        fontSize: 16,
        color: '#555',
        marginTop: 20,
    },
    userInfo: {
        width: '100%',
        padding: 15,
        backgroundColor: '#171617', 
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignItems: 'flex-start',
    },
    userInfoText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
    },
    bio: {
        backgroundColor: '#eeffa1',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        color: '#333',
    },
});

export default UserSearch;