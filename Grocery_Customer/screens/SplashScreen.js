import React, { Component } from 'react'
import { Text, View,StyleSheet,ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class SplashScreen extends Component {

    componentDidMount(){
        const user = auth().currentUser
        this.props.navigation.navigate(user ? "Tab" : "Login");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> SplashScreen </Text>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
