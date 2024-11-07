import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Profile from "../../screens/Profile";
import Home from "../../screens/Home";

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>

<Tab.Screen
    name="Profile"
    component={Profile}
    options={{
        headerShown: false,
        tabBarIcon: ({ size }) => (
            <FontAwesome name="user" size={size} color="white" />
        ),
        tabBarStyle: { backgroundColor: '#9b4d96' }, 
    }}
/>

<Tab.Screen
    name="Homee"
    component={Home}
    options={{
        headerShown: false,
        tabBarIcon: ({  size }) => (
            <FontAwesome name="home" size={size} color="white" />
        ),
        tabBarStyle: { backgroundColor: '#9b4d96' }, 
    }}
/>

        </Tab.Navigator>
    );
};

export default HomeMenu;