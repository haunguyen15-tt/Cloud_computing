import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';

import Container from '../Screens/Admin/Container';

import COLORS from '../assets/data/colors';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const user = useSelector((state) => state.auth?.user);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 15,
          elevation: 0,
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          height: 70,
          padding: 10,
          flexDirection: 'column',
          ...styles.shadow,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.red,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
              <Icon color={focused ? '#e32f45' : '#748c94'} name='home-filled' size={28} />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
              <Icon color={focused ? '#e32f45' : '#748c94'} name='person' size={28} />
              <Text
                style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, fontWeight: 'bold' }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
      {user?.role?.toLowerCase() === 'admin' && (
        <Tab.Screen
          name='Admin'
          component={Container}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon color={'#fff'} name='admin-panel-settings' size={28} />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props}></CustomTabBarButton>,
          }}
        />
      )}
      <Tab.Screen
        name='Favorite'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
              <Icon color={focused ? '#e32f45' : '#748c94'} name='favorite' size={28} />
              <Text
                style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, fontWeight: 'bold' }}
              >
                Favorite
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
              <Icon color={focused ? '#e32f45' : '#748c94'} name='shopping-cart' size={28} />
              <Text
                style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, fontWeight: 'bold' }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -30, justifyContent: 'center', alignItems: 'center', ...styles.shadow }}
    onPress={onPress}
  >
    <View style={{ width: 50, height: 50, borderRadius: 35, backgroundColor: '#e32f45' }}>
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNav;
