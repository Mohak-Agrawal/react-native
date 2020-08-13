import React, { Component } from 'react'
import { Text, View, Image, BackHandler} from 'react-native'
import Styles from '../styles/GlobalStyles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default class MenuScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      handleBackPress = () => {
        BackHandler.exitApp()
      }

      onPressExit = () => {
        BackHandler.exitApp()
      }

    render() {
        return (
            <View style={Styles.menuContainer}>
                <Image source={require('../assets/images/tictactoeheader.png')} resizeMode='contain'/>
                <View style={Styles.card}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('GameScreen')}>  
                        <View style={Styles.button}>
                            <Text style={Styles.buttonText}>Start Game</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressExit()}>
                        <View style={Styles.button}>
                            <Text style={Styles.buttonText}>Exit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
