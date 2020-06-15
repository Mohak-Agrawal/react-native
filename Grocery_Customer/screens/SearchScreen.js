import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { Searchbar } from 'react-native-paper'
import {Header} from 'react-native-elements'
import { Appbar } from 'react-native-paper';
export default class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.container}>  
            <Searchbar placeholder="Search Products" iconColor='#16A085' style={{marginBottom:10}} />
            </View>
            
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding:5
    }
})