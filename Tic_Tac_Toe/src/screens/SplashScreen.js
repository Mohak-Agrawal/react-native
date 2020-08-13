import React, { Component } from 'react'
import { Text, View ,Image} from 'react-native'
import Styles from '../styles/GlobalStyles'

export default class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
          this.props.navigation.navigate('MenuScreen')
        }, 1500);
      }

    render() {
        return (
            <View style={Styles.container}>
                <Image source={require('../assets/images/splashIcon.png')} resizeMode='center'/>
            </View>
        )
    }
}
