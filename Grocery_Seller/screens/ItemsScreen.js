import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,Platform,} from 'react-native'
import { categories } from "../data/tempData";
import { FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Switch, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';

export default class ItemsScreen extends Component {
    constructor(props){
        super(props);
        this.subscriber=
        firestore().collection("Sellers").doc('Seller_1').collection('Products').onSnapshot(res =>{
           let docs = res.size ? res.docs : []
            this.setState({groceryItems:docs})
        })
        this.state={
            category:'',
            title:'',
            price:null,
            image:null,
            remoteUri:'',
            hide:true,
            inStock:true,
            key:''
        }}

        inputValueUpdate = (val, prop) => {
            const state = this.state;
            state[prop] = val;
            this.setState(state);
          }

        PickImage = () => {
            ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 800}, res => {
              if (res.didCancel) {
                console.log("User cancelled!");
              } else if (res.error) {
                console.log("Error", res.error);
              } else {
                this.setState({
                  image: res.uri 
                });
              }
            });  
          }

          deleteItem = (docId,title,category) => {
            console.log(docId,title,category)
              firestore().collection('Sellers').doc('Seller_1').collection('Products').doc(docId).delete()
            //   .then(()=>{
            //     storage()
            //     .ref(`itemImages/${category}/${title}`)
            //     .delete()
            //   })
              
              console.log('deleted')
          }

          updateItem = () => {
            console.log('updated')
            
          }

        addItem = () => {
            let key = Math.random().toString(36).substring(7);

            let {title,image,price,category,inStock} = this.state
            storage()
                .ref(`itemImages/${category}/${title}`)
                .putFile(image)
                .then((file) => {
                    storage().ref(`itemImages/${category}/${title}`).getDownloadURL().then((url) => {
                        
                            this.setState({remoteUri: url,key:key});  
                            firestore().collection('Sellers').doc('Seller_1').collection('Products').
                            add({
                                title:title,
                                price:parseInt(price),
                                category:category,
                                image: url,
                                inStock:inStock,
                                key:key,
                                addedToCart:false,
                                addedToWishlist:false
                            })
                        })
                })
                .catch((error) => console.log(error));             
        }

        onToggleSwitch = (key) => {
            console.log(key)
            this.setState({inStock:true});
        }
        showMenu = () => {this.setState({hide:false}) }
        hideMenu = () => {this.setState({hide:true}) }

    render() {   
        return (
            <View style={styles.container}>
                {this.state.hide?
                <View style={styles.addButton}>
                <TouchableNativeFeedback style={styles.touchable} onPress={()=>this.showMenu()}>
                    <Text style={{color:'#16A085',fontSize:18}}>ADD ITEM</Text>
                    <Icon name="keyboard-arrow-down" size={24} style={{elevation:10}} color="#16A085"/>
                </TouchableNativeFeedback>
                </View>
                :
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
                    <View style={styles.addButton}>
                        <TouchableNativeFeedback style={styles.touchable} onPress={()=>this.hideMenu()}>
                            <Text style={{color:'#16A085',fontSize:18}}>ADD ITEM</Text>
                            <Icon name="keyboard-arrow-up" size={24} style={{elevation:10}} color="#16A085"/>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-evenly',}}>
                        <View >
                            <TouchableOpacity style={{alignItems:'center'}} onPress={()=> this.PickImage()}  >
                            {this.state.image==null?
                            <Icon name='camera-alt' size={100} color={'grey'} style={{elevation:20}} />
                            :
                            <Image source={{uri:this.state.image}} style={{width:80,height:70,borderRadius:10,marginTop:15}} onPress={()=> this.UploadImage()} />
                            }
                            <Text style={{marginTop:10}}>{this.state.image==null?"Add Photo":"Retake Photo"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'column',padding:10,}}>
                            <TextInput
                            style={styles.inputStyle}
                            label="Title"
                            mode='outlined'
                            theme={{ colors: { primary: '#16A085',}}}
                            value={this.state.title}
                            onChangeText={(val) => this.inputValueUpdate(val, 'title')}
                            />
                            <TextInput
                            style={styles.inputStyle}
                            label="Price"
                            keyboardType='numeric'
                            mode='outlined'
                            theme={{ colors: { primary: '#16A085',}}}
                            value={this.state.price}
                            onChangeText={(val) => this.inputValueUpdate(val, 'price')}
                            />
                            <Picker
                                style={{width:170}}
                                selectedValue={this.state.category}
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})} >
                                { categories.map((item, key)=>(
                                <Picker.Item label={item.text} value={item.text} key={key} />)
                                )}
                        
                            </Picker>
                        </View>  
                    </View>
                    <View style={{backgroundColor:'#16A085',paddingVertical:10,paddingHorizontal:20,margin:5,borderRadius:5,elevation:10}}>
                        <TouchableOpacity onPress={()=>this.addItem()}>
                        <Text style={{color:'white'}}>SUBMIT</Text> 
                        </TouchableOpacity>
                    </View>    
                </View>
                }
                
                <FlatList 
                data={this.state.groceryItems} 
                renderItem={({ item }) => this.renderItem(item.data(),item.id)}
                keyExtractor={(item, index) => index.toString()}   
                showsHorizontalScrollIndicator={false} 
                />
            </View>
        )
    }

    renderItem(item,id){
        return(
            <View key={id} >
                <View style={styles.card} >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:item.image}} style={{width:80,height:80,borderRadius:5,margin:10}} />
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{item.title}</Text>
                        <Text>{item.category}</Text>
                        <Text>₹{item.price}</Text>
                    </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Switch
                            value={this.state.inStock}
                            // onValueChange={this.onToggleSwitch(item.key)}
                            color={"#16A085"}   
                        />
                        <Text>IN STOCK</Text>
                    </View>
                </View>
                <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',}}>
                    <View style={{alignItems:'center',width:'50%',padding:10,borderBottomWidth:1,borderRightWidth:1,borderColor:'#f2f2f2'}}>
                         <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.deleteItem(id,item.title,item.category)}>
                         <Icon name="delete" size={24} color="red"/>
                         <Text style={{fontSize:10,color:'red'}}>DELETE</Text>   
                         </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'center',width:'50%',padding:10,borderBottomWidth:1,borderLeftWidth:1,borderColor:'#f2f2f2'}}>
                         <TouchableOpacity style={{alignItems:'center'}} onPress={()=> this.updateItem()}>
                         <Icon name="create" size={24} color="#16A085"/> 
                         <Text style={{fontSize:10,color:'#16A085'}}>EDIT</Text> 
                         </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'white'
    },
    card:{
        backgroundColor: 'white',
        width:"100%",
        borderWidth:1,
        borderColor:'#f2f2f2',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        flexDirection:'row',  
    },
    addButton:{
        backgroundColor:"white",
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        
    },
    touchable:{
        flexDirection:'row',
        padding:10,
        marginHorizontal:130
    },
    inputStyle: {
        width: 170,
        height:30,
        alignSelf: "center",
        borderColor: "#f2f2f2",
        fontSize:16,
        backgroundColor:'white',
        
      },
  })