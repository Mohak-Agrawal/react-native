import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet,Image, Alert,ToastAndroid } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar,ActivityIndicator } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
const uid = auth().currentUser.uid;
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
          firestore().collection('Users').doc(uid).collection('Wishlist').onSnapshot(res =>{
            console.log('res from',res)
            let docs = res.size ? res.docs : null
             this.setState({favoriteItems:docs,loaded:true})
          })
         
        }

              onUnlike = (id) => {
                firestore().collection('favoriteItems').doc(id).delete()
                ToastAndroid.show("Removed from wishlist", ToastAndroid.SHORT);
              }

              moveToCart = (title,price,image,category,id) => {
                firestore().collection('userCartItems').add({
                  title:title,
                  price:price,
                  category:category,
                  quantity:1,
                  image: image,
                  addedToCart:true
              })
              firestore().collection('favoriteItems').doc(id).delete()
              ToastAndroid.show("Moved to cart", ToastAndroid.SHORT);
              }

    render() {
      let { favoriteItems,loaded}= this.state
      
        return (
            <View style={styles.container}>
                <Appbar.Header style={{backgroundColor:'white'}}>   
                <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
                <Appbar.Content title="Favorites"/>
                </Appbar.Header>

                {loaded ? 
                this.state.favoriteItems!=null ?
                  <FlatList style={{flex:1}} 
                data={this.state.favoriteItems} 
                numColumns={2}
                renderItem={({ item }) => this.renderItem(item.data(),item.id)}
                keyExtractor={(item, index) => index.toString()}    
                showsVerticalScrollIndicator={false} 
                />
                :
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Icon name="favorite" size={60} color="red"  />
                  <Text style={{fontSize:18}}>You haven't added any products yet</Text>
                </View>
                :
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator animating={true} color={'#16A085'} style={{alignSelf:'center'}}/>
                </View>
                }
            </View>
        )
    }
    renderItem(item,id){
        if(item.addedToWishlist===true)
        {
          return(
            <View style={styles.card}>
              <View style={{padding:15}} >
                {item.addedToWishlist? <Icon name="favorite" size={28} color="red" style={{alignSelf:'flex-end'}} onPress={()=>{this.onUnlike(id)}}/> 
                : <Icon name="favorite-border" size={28} color="#555" style={{alignSelf:'flex-end'}} />}
                <Image source={{uri:item.image}} style={{width:'70%',height:80,alignSelf:'center',marginBottom:20,borderRadius:5}} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>{item.title}</Text>
                <Text>₹{item.price}</Text>
              </View> 
              {false?
                <View style={{backgroundColor:'white',padding:10,justifyContent:'space-evenly',borderWidth:1,borderColor:'#f2f2f2',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#16A085'}}>GO TO CART</Text>          
                </View>:
                <TouchableNativeFeedback onPress={()=>this.moveToCart(item.title,item.price,item.image,item.category,id)}>
                  <View style={{backgroundColor:'#16A085',padding:10,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:14,color:'white'}}>MOVE TO CART</Text> 
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
