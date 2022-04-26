import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';

import COLORS from '../assets/data/colors';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 55,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                showLabel: false,
                tabBarActiveTintColor: COLORS.red,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name='HomePage'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home-filled' color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='person' color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name='Favorite'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='favorite' color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name='Cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='shopping-cart' color={color} size={28} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNav;
