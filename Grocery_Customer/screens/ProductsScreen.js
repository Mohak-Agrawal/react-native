import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet,Image, Alert,ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { Appbar,ActivityIndicator } from 'react-native-paper';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
export default class ProductsScreen extends Component {
   
  constructor(props) {
    super(props);
    
      this.state = {
        liked: false,
        addedToCart: false ,
        quantity:1,
        selectedItem:null
      }
    }

    componentDidMount = () => {
      this.subscriber=
        firestore().collection("groceryItems").onSnapshot(res =>{
          let docs = res.size ? res.docs : []
          this.setState({groceryItems:docs})
        })
    };


    componentWillUnmount() {
      if(this.subscriber) this.subscriber()
    }
    
    
  
    onLike = (id,title,price,image,category,) => {
      firestore().collection('favoriteItems').add({
        title:title,
        price:price,
        category:category,
        image: image,
        addedToWishlist:true
    })
     firestore().collection('groceryItems').doc(id).update({addedToWishlist:true})
      ToastAndroid.show("Added to wishlist", ToastAndroid.SHORT);
    }

    onUnlike = (id) => {
      firestore().collection('groceryItems').doc(id).update({addedToWishlist:false})
      ToastAndroid.show("Removed from wishlist", ToastAndroid.SHORT);
    }
    
    addToCart = (title,price,image,category,id) => {
      firestore().collection('userCartItems').add({
        title:title,
        price:price,
        category:category,
        image: image,
        quantity:1,
        addedToCart: true
    })
      firestore().collection('groceryItems').doc(id).update({addedToCart:true})
      ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
    }
  
  render() {
    let {groceryItems} = this.state
    return (
      <View style={styles.container}>  
          <Appbar.Header style={{backgroundColor:'white'}}>   
            <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
            <Appbar.Content
            title="Products"
            />
            </Appbar.Header>
         {groceryItems ?
         
          <FlatList style={{flex:1}} 
          extraData={this.state.selectedItem}
          data={this.state.groceryItems} 
          numColumns={2}
          renderItem={({ item }) => this.renderItem(item.data(),item.id)}
          keyExtractor={(item, index) => index.toString()}    
          showsVerticalScrollIndicator={false} 
          /> 
          :
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator animating={true} color={'#16A085'} style={{alignSelf:'center'}}/>
          </View>
        }
      </View>
    );
  }
  renderItem(item,id){
    const {category}= this.props.route.params
    if(category==item.category&&item.inStock===true)
    {
      return(
        <View style={styles.card}>
          <View style={{padding:15}} >
            {item.addedToWishlist? <Icon name="favorite" size={28} color="red" style={{alignSelf:'flex-end'}} onPress={()=>{this.onUnlike(id)}}/> 
            : <Icon name="favorite-border" size={28} color="#555" style={{alignSelf:'flex-end'}} onPress={()=>{this.onLike(id,item.title,item.price,item.image,item.category)}}/>}
            <Image source={{uri:item.image}} style={{width:'70%',height:80,alignSelf:'center',marginBottom:20,borderRadius:5}} />
            <Text style={{fontSize:20,fontWeight:'bold'}}>{item.title}</Text>
            <Text>₹{item.price}</Text>
          </View> 
          {item.addedToCart?
            <View style={{backgroundColor:'white',padding:10,justifyContent:'space-evenly',borderWidth:1,borderColor:'#f2f2f2',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#16A085'}}>GO TO CART</Text>          
            </View>:
            <TouchableNativeFeedback onPress={()=>this.addToCart(item.title,item.price,item.image,item.category,id)}>
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