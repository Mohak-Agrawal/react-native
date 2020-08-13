import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AppStack from './src/navigators/AppStack'

export default class App extends Component {
  render() {
    return (
      <AppStack/>
    )
  }
}
