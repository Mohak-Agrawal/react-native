import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'

const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator  initialRouteName="Splash"
      screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Tab" component={TabNavigator} />
      </Stack.Navigator>
    );
  }
  
  export default function MainAppNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
     
    );
  }
  