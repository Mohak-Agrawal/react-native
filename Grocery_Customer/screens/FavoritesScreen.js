import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet,Image, Alert,ToastAndroid } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
//iss screen mein alg error h
export default class FavoritesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          favoriteItems: null,
          loaded : false
        }
        
        }
        componentDidMount(){
          this.subscriber=
          firestore().collection("favoriteItems").onSnapshot(res =>{
            console.log('res from',res)
            let docs = res.size ? res.docs : null
             this.setState({favoriteItems:docs,loaded:true})
          })
         
        }

              onUnlike = (id) => {
                firestore().collection('favoriteItems').doc(id).update({addedToWishlist:false})
                ToastAndroid.show("Removed from wishlist", ToastAndroid.SHORT);
              }

    render() {
      let { favoriteItems,loaded}= this.state
      // console.log(this.state) kch bhi naa likha..?bss loding 
        return (
            <View style={styles.container}>
                <Appbar.Header style={{backgroundColor:'white'}}>   
                <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
                <Appbar.Content title="Favorites"/>
                </Appbar.Header>

                {loaded ? 
                favoriteItems ?
                  <FlatList style={{flex:1}} 
                data={this.state.favoriteItems} 
                numColumns={2}
                renderItem={({ item }) => this.renderItem(item.data(),item.id)}
                keyExtractor={(item, index) => index.toString()}    
                showsVerticalScrollIndicator={false} 
                />
                :
                <Text style={{textAlign:'center'}}> NO Items Found</Text>
                :
                <Text style={{textAlign:'center'}}> Loading The Items List...</Text>
                }
            </View>
        )
    }
    renderItem(item,id){
        if(item.addedToWishlist===true&&item.inStock===true)
        {
          return(
            <View style={styles.card}>
              <View style={{padding:15}} >
                {item.addedToWishlist? <Icon name="favorite" size={28} color="red" style={{alignSelf:'flex-end'}} /> 
                : <Icon name="favorite-border" size={28} color="#555" style={{alignSelf:'flex-end'}} onPress={()=>{this.onUnlike(id)}}/>}
                <Image source={{uri:item.image}} style={{width:'70%',height:80,alignSelf:'center',marginBottom:20,borderRadius:5}} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>{item.title}</Text>
                <Text>₹{item.price}</Text>
              </View> 
              {false?
                <View style={{backgroundColor:'white',padding:10,justifyContent:'space-evenly',borderWidth:1,borderColor:'#f2f2f2',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#16A085'}}>GO TO CART</Text>          
                </View>:
                <TouchableNativeFeedback onPress={()=>this.addToCart(item.title,item.price,item.image,item.category)}>
                  <View style={{backgroundColor:'#16A085',padding:10,justifyContent:'center',alignItems:'center'}}>
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
    },
      card: {
        backgroundColor: 'white',
        width:'50%',
        borderWidth:1,
        borderColor:'#f2f2f2',
        
      },
    
    })
