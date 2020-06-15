import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator  initialRouteName="Account"
    screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

export default function AccountStackNavigator() {
  return (
    
      <MyStack />
   
  );
}
