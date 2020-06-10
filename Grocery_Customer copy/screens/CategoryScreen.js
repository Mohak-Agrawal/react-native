import React,{Component} from 'react'
import { View, Text,StyleSheet,FlatList,Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {categories} from '../data/tempData'
import { Appbar } from 'react-native-paper';


export default class CategoryScreen extends Component {
   
    render() {
      return (
        <View style={styles.container}>  
            <Appbar.Header style={{backgroundColor:'white'}}>   
            <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
            <Appbar.Content
            title="Categories"
            />
            </Appbar.Header>
            <FlatList data={categories} renderItem={({item}) => (
                <TouchableNativeFeedback  onPress={() => this.props.navigation.navigate('Products',{category:item.text})}>
                <View style={styles.card}>
                  <View style={{flex:1}}>
                  <Image source={item.image} style={{height:70,width:100,}} /> 
                  </View>
                  <View style={{flexDirection:"column",justifyContent:'space-between',flex:1,}}>
                      <Text style={{fontSize:20,color:"#16A085"}}>{item.text}</Text>
                      <Text style={{color:'black',fontSize:12}}>{item.description}</Text>  
                  </View>
                </View>
                </TouchableNativeFeedback>
            )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      padding: 10,
      backgroundColor: 'white',
      flex:1,
      borderWidth:1,
      borderColor:'#f2f2f2',
      flexDirection:'row',
      alignItems:"center",
      justifyContent:'space-between'
      
    },
  })

