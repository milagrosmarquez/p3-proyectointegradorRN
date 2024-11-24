import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserSearch from '../components/UserSearch/UserSearch';

const Users = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Búsqueda</Text>
      <UserSearch />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#abebc6",
    padding: 20,
  },
});

export default Users;