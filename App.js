import React from 'react';
import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home';
import Detail from './Screens/Detail';
import BottomNav from './components/BottomNav';

import COLORS from './assets/data/colors';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={BottomNav} />
                <Stack.Screen name='Detail' component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
