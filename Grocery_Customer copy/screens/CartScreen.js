import React, { Component } from 'react'
import { Text, View ,StyleSheet,Dimensions,Image} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableNativeFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export default class CartScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            dataCart:[],
            cartEmpty: true,

        }
    }
    componentDidMount(){
        
        
    }
    onChangeQuantity=(type,i)=>{
        
        const cart=this.state.dataCart
         let count= cart[i].quantity
        if(type){
            count=count+1
            cart[i].quantity=count
            this.setState({dataCart:cart })
        }
        else if(type==false&&count>=2){
            count=count-1
            cart[i].quantity=count
            this.setState({dataCart:cart })
        }
        else if(type==false&&count==1){
            cart.splice(i,1)
            this.setState({dataCart:cart})
        }
    }
    onLoadTotal=()=>{
        var total=0
        const cart= this.state.dataCart
        for(var i=0; i < cart.length; i++){
            total=total+(cart[i].price*cart[i].quantity)
        }
        return total
    }
    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.headerStyle}>
                        <Text style={{color:'yellow',fontSize:18}}>Products</Text>
                        <Icon name="arrow-forward" size={24} color={'white'}/>
                        <Text style={{color:'white',fontSize:18}}>Address</Text>
                        <Icon name="arrow-forward" size={24} color={'white'}/>
                        <Text style={{color:'white',fontSize:18}}>Payment</Text>
                    </View>
                    {this.state.cartEmpty?
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="remove-shopping-cart" size={100} color={'grey'} style={{margin:10}}/>
                    <Text > Your cart is empty.</Text>
                    </View>:
                    
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.dataCart.map((item,i)=>{
                            return(
                                
                                <View style={styles.card}>
                                <View style={{justifyContent:'flex-start',alignItems:'center',flex:2}}>
                                     <Image source={item.food.image} style={{width:80,height:80,borderRadius:50}} />
                                </View>
                                <View style={{flexDirection:'column',flex:2}}>
                                    <Text style={{fontSize:20}}>{item.food.title}</Text>
                                    {/* <Text style={{color:'grey'}}>{item.quantity}</Text> */}
                                    <Text style={{color:'grey'}}>₹{item.price*item.quantity}</Text>
                                </View>
                                <View style={{backgroundColor:'white',padding:5,alignItems:'center',flexDirection:'column',flex:1}}>
                                    <TouchableOpacity >
                                        <Icon name="add-circle" size={28} style={{elevation:10}} color="#16A085" onPress={()=>this.onChangeQuantity(true,i)}/>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:20,padding:5}}>{item.quantity}</Text> 
                                    <TouchableOpacity >
                                        <Icon name="remove-circle" size={28} style={{elevation:10}} color="#16A085" onPress={()=>this.onChangeQuantity(false,i)}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                            
                        })
                    }
                    
                    
                    </ScrollView>}
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingHorizontal:20,paddingVertical:10,backgroundColor:'white',alignSelf:'flex-end'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Total:  </Text>
                            <Text style={{fontSize:20,color:'#16A085'}}>₹ {this.onLoadTotal()}</Text>
                        </View>
                        <View style={{backgroundColor:'#16A085',paddingHorizontal:20,paddingVertical:10,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:16}}>CHECKOUT</Text>
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