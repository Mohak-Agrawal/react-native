import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TabNavigator from './navigators/TabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
      <TabNavigator/>
      </NavigationContainer>
    )
  }
}
