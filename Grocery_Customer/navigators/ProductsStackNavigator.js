import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen'
import ProductsScreen from '../screens/ProductsScreen'
import CategoryScreen from '../screens/CategoryScreen'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator  initialRouteName="Menu"
    screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Categories" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default function ProductsStackNavigator() {
  return (
    
      <MyStack />
   
  );
}
