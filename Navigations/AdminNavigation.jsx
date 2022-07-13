import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Orders from '../Screens/Admin/pages/Orders';
import Products from '../Screens/Admin/pages/Products';
import Categories from '../Screens/Admin/pages/Categories';
import ProductForm from '../Screens/Admin/pages/ProductForm';
import Users from '../Screens/Admin/pages/Users';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Products'
        component={Products}
        options={{
          title: 'Products',
        }}
      />
      <Stack.Screen name='Categories' component={Categories} />
      <Stack.Screen name='Orders' component={Orders} />
      <Stack.Screen name='ProductForm' component={ProductForm} />
      <Stack.Screen name='Users' component={Users} />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
