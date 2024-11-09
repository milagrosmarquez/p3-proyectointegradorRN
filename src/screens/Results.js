import React, { Component } from 'react'
import { View, Text } from 'react-native';

class Results extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Búsqueda</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#3e9e49",
        padding: 20,
    },
});
export default Results;