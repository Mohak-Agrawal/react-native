import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableNativeFeedback, ScrollView } from 'react-native-gesture-handler';

export default class AccountScreen extends Component {
    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
               <View style={styles.outline}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                       <Text style={{fontSize:20}}>MOHAK AGRAWAL</Text>
                       <TouchableNativeFeedback style={{padding:5}}>
                       <Text style={{color:'#16A085',fontSize:16}}>EDIT</Text>
                       </TouchableNativeFeedback>
                   </View>
                   <View style={{flexDirection:'row',width:'100%'}}>
                       <Text style={{fontSize:14,marginRight:10,color:'grey',}}>8959210749</Text>
                       <Text style={{color:'grey',fontSize:14}}>mohakagrawal2@gmail.com</Text>
                   </View>
               </View>
               
               <View style={styles.viewOutline}>
               <TouchableNativeFeedback style={styles.touchable}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Icon name="home" size={28} color={'#16A085'}/>
                       <Text style={{fontSize:14,marginLeft:10}}>Manage Address</Text>
                   </View>
                   <Icon name="keyboard-arrow-right" size={28} color={'#16A085'}/>
               </TouchableNativeFeedback>   
               </View>
               
               <View style={styles.viewOutline}>
               <TouchableNativeFeedback style={styles.touchable}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Icon name="account-balance-wallet" size={28} color={'#16A085'}/>
                       <Text style={{fontSize:14,marginLeft:10}}>Payment</Text>
                   </View>
                   <Icon name="keyboard-arrow-right" size={28} color={'#16A085'}/>
                </TouchableNativeFeedback>
               </View>

               <View style={styles.viewOutline}>
               <TouchableNativeFeedback style={styles.touchable}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Icon name="favorite" size={28} color={'#16A085'}/>
                       <Text style={{fontSize:14,marginLeft:10}}>Favorites</Text>
                   </View>
                   <Icon name="keyboard-arrow-right" size={28} color={'#16A085'}/>
               </TouchableNativeFeedback>
               </View>

               <View style={styles.viewOutline}>
               <TouchableNativeFeedback style={styles.touchable}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Icon name="settings" size={28} color={'#16A085'}/>
                       <Text style={{fontSize:14,marginLeft:10}}>App Settings</Text>
                   </View>
                   <Icon name="keyboard-arrow-right" size={28} color={'#16A085'}/>
                </TouchableNativeFeedback>
               </View>

               <View style={styles.viewOutline}>
                    <Text style={{fontSize:16,color:'grey',margin:10,padding:10 ,}}>PAST ORDERS</Text>
               </View>
            </View>
            </ScrollView>
        )
    }
}
const styles =StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white'
    },
    outline:{
        borderBottomColor:'#DADADB',
        borderTopColor:'white',
        borderWidth:1,
        padding:20 ,
        width:'100%',
    },
    viewOutline:{
        borderBottomColor:'#DADADB',
        borderBottomWidth:1,
        width:'100%',
        
    },
    touchable:{
        flexDirection:'row',
        padding:15,
        
        justifyContent:'space-between', 
        alignItems:'center'
    },
    
})
