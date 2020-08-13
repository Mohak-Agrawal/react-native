import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'
import MenuScreen from '../screens/MenuScreen'
import GameScreen from '../screens/GameScreen'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
