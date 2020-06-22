import React, { Component } from 'react'
import { Text, View ,StyleSheet,Dimensions,Image,FlatList} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableNativeFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
const uid = auth().currentUser.uid;
var total=0
let quantityCount=1
let count=0  

export default class CartScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            cartEmpty: true,
            total:null,
        }
    }

    componentDidMount() {
        this.subscriber=
        firestore().collection('Users').doc(uid).collection('Cart').onSnapshot(res => {
            console.log(res)
            count=res.size
           let docs = res.size ? 
           res.docs : []
           this.setState({
            userCartItems:docs,})

           if(count<1){
                this.setState({
                cartEmpty: true,})
            }
            else{
                this.setState({
                cartEmpty: false,})}
            
        })
    }
    
    
    onChangeQuantity=(docId,type,i,item)=>{
        
        if(type){
            item.quantity=item.quantity+1
            firestore().collection('userCartItems').doc(docId).update({quantity:item.quantity})
            this.setState({total:item.price*item.quantity})
        }
        else if(type==false&&item.quantity>=2){
            item.quantity=item.quantity-1
            firestore().collection('userCartItems').doc(docId).update({quantity:item.quantity})
        }
        else if(type==false&&item.quantity==1){
            firestore().collection('userCartItems').doc(docId).delete()
            //firestore().collection('groceryItems').doc(docId).update({addedToCart:false})
        }
    }
    onLoadTotal=()=>{
        console.log('reached')
        return 100
        // var total=0
        // for(var i=0; i < count; i++){
        //     total=total+(cart[i].price*cart[i].quantity)
        // }
        // return total
    }
    addToFavorite=(id)=>{
        console.log('reached')
        firestore().collection('userCartItems').doc(id).delete()
    }

    removeFromCart=(id)=>{
        firestore().collection('userCartItems').doc(id).delete()
    }

    render() {
        
        let totalPrice=0;
        // const {userCartItems}=this.state.userCartItems;
        // userCartItems.forEach((item) => {
        //     totalPrice+=item.quantity*item.price
        // });
        return (
            <View style={styles.container}>
                    
                    <View style={styles.headerStyle}>
                        <Text style={{color:'yellow',fontSize:18}}>Cart</Text>
                        <Icon name="arrow-forward" size={24} color={'white'}/>
                        <Text style={{color:'white',fontSize:18}}>Address</Text>
                        <Icon name="arrow-forward" size={24} color={'white'}/>
                        <Text style={{color:'white',fontSize:18}}>Payment</Text>
                    </View>
                    {this.state.cartEmpty?
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="remove-shopping-cart" size={100} color={'grey'} style={{margin:10}}/>
                        <Text > Your cart is empty.</Text>
                    </View>
                    :
                    <FlatList 
                    data={this.state.userCartItems} 
                    renderItem={({ item }) => this.renderItem(item.data(),item.id)}
                    keyExtractor={(item, index) => index.toString()}   
                    showsVerticaltalScrollIndicator={false} 
                    />}

                     <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingHorizontal:20,paddingVertical:10,backgroundColor:'white',alignSelf:'flex-end'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Total:  </Text>
                            <Text style={{fontSize:20,color:'#16A085'}}>₹ {totalPrice}</Text>
                        </View>
                        <View style={{backgroundColor:'#16A085',paddingHorizontal:20,paddingVertical:10,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:16}}>CHECKOUT</Text>
                        </View>
                    </View>
            </View>
        )
    }
    renderItem(item,id,i){
        return(  
            <View>           
            <View style={styles.card} key={id}>
                <View style={{justifyContent:'flex-start',alignItems:'center',flex:2}}>
                        <Image source={{uri:item.image}} style={{width:80,height:80,borderRadius:5}} />
                </View>
                <View style={{flexDirection:'column',flex:2}}>
                    <Text style={{fontSize:20}}>{item.title}</Text>
                    <Text style={{color:'grey'}}>{item.quantity}</Text>
                    <Text style={{color:'grey'}}>₹{item.price*item.quantity}</Text>
                </View>
                <View style={{backgroundColor:'white',padding:5,alignItems:'center',flexDirection:'column',flex:1}}>
                    <TouchableOpacity >
                        <Icon name="add-circle-outline" size={28} style={{elevation:10}} color="#16A085" onPress={()=>this.onChangeQuantity(id,true,i,item)}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,padding:5}}>{item.quantity}</Text> 
                    <TouchableOpacity >
                        <Icon name="remove-circle-outline" size={28} style={{elevation:10}} color="#16A085" onPress={()=>this.onChangeQuantity(id,false,i,item)}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{width:'50%',borderWidth:1,borderColor:'#f2f2f2',justifyContent:'center',alignItems:'center',paddingHorizontal:10,paddingVertical:15,flexDirection:'row',backgroundColor: 'white',}} >
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> this.addToFavorite(id)}>
                    <Icon name='favorite' size={18} color={'grey'}/>
                    <Text style={{marginHorizontal:10}}>Save for later</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'50%',borderWidth:1,borderColor:'#f2f2f2',justifyContent:'center',alignItems:'center',paddingHorizontal:10,paddingVertical:15,flexDirection:'row',backgroundColor: 'white',}} >
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> this.removeFromCart(id)}>
                    <Icon name='delete' size={18} color={'grey'}/>
                    <Text style={{marginHorizontal:10}}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}                     
                    
                
        
const styles=StyleSheet.create({
    card:{
        backgroundColor: 'white',
        width:"100%",
        borderWidth:1,
        borderColor:'#f2f2f2',
        alignItems:'center',
        justifyContent:'space-evenly',
        padding:10,
        flexDirection:'row',
        
        
    },
    container:{
        flex:1,
        alignItems:'center',
        flexDirection:'column'
        
    },
    headerStyle:{
        backgroundColor:"#16A085",
        flexDirection:'row',
        width:'100%',
        padding:20,
        alignItems:'center',
        justifyContent:'space-evenly',
        elevation:10
    }
})