import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet,Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {products} from '../data/tempData'
import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';

export default class ProductsScreen extends Component {
   
  constructor(props) {
    super(props);
    this.subscriber=
        firestore().collection("groceryItems").onSnapshot(res =>{
          let docs = res.size ? res.docs : []
          this.setState({groceryItems:docs})
        })
      this.state = {
        liked: false,
        addedToCart: false ,
        quantity:1
      }
    }
  
    onLike = () => {
        this.setState({
            liked: true
        });
    }

    onUnlike = () => {
      this.setState({
          liked: false
      });
    }
    
    addToCart = () => {
      this.setState({
          addedToCart: true
      });
    }
  
  render() {
    return (
      <View style={styles.container}>  
          <Appbar.Header style={{backgroundColor:'white'}}>   
            <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
            <Appbar.Content
            title="Products"
            />
            </Appbar.Header>
          <FlatList style={{flex:1}} 
          data={this.state.groceryItems} 
          numColumns={2}
          renderItem={({ item }) => this.renderItem(item.data())}
          keyExtractor={(item, index) => index.toString()}    
          />
      </View>
    );
  }
  renderItem(item){
    const {category}= this.props.route.params
    if(category==item.category&&item.inStock===true)
    {
      return(
        <View style={styles.card}>
          <View style={{padding:15}} >
            {this.state.liked ? <Icon name="favorite" size={28} color="red" style={{alignSelf:'flex-end'}} onPress={()=>{this.onUnlike()}}/> 
            : <Icon name="favorite-border" size={28} color="#555" style={{alignSelf:'flex-end'}} onPress={()=>{this.onLike()}}/>}
            <Image source={{uri:item.image}} style={{width:'70%',height:80,alignSelf:'center',marginBottom:20,borderRadius:5}} />
            <Text style={{fontSize:20,fontWeight:'bold'}}>{item.title}</Text>
            <Text>₹{item.price}</Text>
          </View> 
          {this.state.addedToCart?
            <View style={{backgroundColor:'white',padding:5,justifyContent:'space-evenly',borderTopWidth:1,borderColor:'#f2f2f2',alignItems:'center',flexDirection:'row'}}>
            <Icon name="remove-circle-outline" size={28} color="#16A085"/>
            <Text style={{fontSize:24,color:'#16A085'}}>{this.state.quantity}</Text> 
            <Icon name="add-circle-outline" size={28} color="#16A085"/>
            </View>:
            <TouchableNativeFeedback onPress={()=>this.addToCart()}>
              <View style={{backgroundColor:'#16A085',padding:10,justifyContent:'center',alignItems:'center',elevation:10}}>
                <Text style={{fontSize:14,color:'white'}}>ADD TO CART</Text> 
              </View>
            </TouchableNativeFeedback>}
    
        </View>
        )
    }
  }
  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap:'wrap',
      flexDirection:'column'
      
    },
    card: {
      backgroundColor: 'white',
      width:'50%',
      borderWidth:1,
      borderColor:'#f2f2f2',
      
    },
  })