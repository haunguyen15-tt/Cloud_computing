import React from 'react';
import { View, StatusBar, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import Detail from './Screens/Detail';
import BottomNav from './components/BottomNav';
import Login from './Screens/LoginAndRegister/Login';
import Register from './Screens/LoginAndRegister/Register';
import Checkout from './Screens/Checkout';

import { Provider } from 'react-redux';
import store from './Redux/store';

import COLORS from './assets/data/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomePage' component={BottomNav} />
          <Stack.Screen name='Detail' component={Detail} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Checkout' component={Checkout} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
