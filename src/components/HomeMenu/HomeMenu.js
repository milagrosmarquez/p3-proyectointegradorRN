import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react'
import Profile from "../../screens/Profile";
import Home from "../../screens/Home";
import NewPost from "../../screens/NewPost";
import Users from '../../screens/Users';
import { auth } from "../../firebase/config";

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('Login');
            }
        });
    }


    render() {
        return (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>

                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size }) => (
                            <FontAwesome name="home" size={size} color="black" />
                        ),
                        tabBarStyle: { backgroundColor: 'white' },
                    }}
                />


                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size }) => (
                            <FontAwesome name="user" size={size} color="black" />
                        ),
                        tabBarStyle: { backgroundColor: 'white' },
                    }}
                />


                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size }) => (
                            <FontAwesome name="search" size={size} color="black" />
                        ),
                        tabBarStyle: { backgroundColor: 'white' },
                    }}
                />

                <Tab.Screen
                    name="NewPost"
                    component={NewPost}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size }) => (
                            <FontAwesome name="arrow-up" size={size} color="black" />
                        ),
                        tabBarStyle: { backgroundColor: 'white' },
                    }}
                />

            </Tab.Navigator>

        )
    }
}

export default HomeMenu;