import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator  initialRouteName="Login"
      screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }
  
  export default function AuthNavigator() {
    return (
      
        <MyStack />
     
    );
  }
  