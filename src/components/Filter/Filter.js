import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            filterValue: "",
            loading: true,
        };
    }




    render() {

        this.state = { filterValue };

        return (
            <View>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar usuario"
                    value={this.state.filterValue}
                    onChangeText={this.handleFilter}
                />

            </View>
        )
    }
}
export default Filter;
