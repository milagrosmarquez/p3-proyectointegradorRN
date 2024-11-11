import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import UserSearch from '../components/UserSearch/UserSearch';

class Users extends Component {

    render() {
        return (
        <View style={styles.container}>
        <UserSearch></UserSearch>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#abebc6",
        padding: 20,
    },
});
export default Users;