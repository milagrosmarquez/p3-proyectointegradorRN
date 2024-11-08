import React, { Component } from 'react'
 

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.heading}>Crear un nuevo post</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe una descripción..."
                    value={description}
                    onChangeText={text => this.setState({ description: text })}
                />

            </View>
        )
    }
}

export default AddPost ;