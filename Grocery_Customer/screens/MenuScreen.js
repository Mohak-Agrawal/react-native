import React, { Component } from 'react'
import { Text, View,StyleSheet,Image, } from 'react-native'
import { TouchableNativeFeedback, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Searchbar } from 'react-native-paper'
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'


export default class MenuScreen extends Component {
    
    render() {
        return (
            <View style={{flex:1}}>
            <Appbar.Header style={{backgroundColor:'white'}}>   
            <Appbar.Action icon="map-marker" color={'#16A085'} />
            <Appbar.Content
            title="A.B. ROAD"
            subtitle="SHIVPURI"
            />
            <Appbar.Action icon="bell" color={'#16A085'} />
            </Appbar.Header>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.card} >
                    <Swiper autoplay={true} activeDotColor={'#16A085'} style={{height:200}}>
                        <Image source={require('../assets/photos/grocery1.png')} style={styles.imagenew} />
                        <Image source={require('../assets/photos/grocery2.jpg')} style={styles.imagenew} />
                        <Image source={require('../assets/photos/grocery3.jpg')} style={styles.imagenew} />
                    </Swiper>
                    <Text style={{fontSize:28,padding:5,color:"#16A085",}}>GET ALL YOUR ESSENTIALS</Text>
                    <View style={{backgroundColor:"#16A085",padding:5,borderRadius:5}}>
                        <Text style={{fontSize:14,color:'white',fontWeight:'bold'}}>BUY NOW</Text>
                    </View>
                </View>

                <View >
                    <View style={{flexDirection:'row',padding:20,justifyContent:'space-between'}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>
                        See Categories
                    </Text>
                    <View >
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => this.props.navigation.navigate('Categories')}>
                        <Text style={{fontSize:18,color:'#16A085'}}>SEE ALL </Text>
                        <Icon name="arrow-forward" size={18} color={'#16A085'}/>
                    </TouchableOpacity>
                    </View>
                    </View>

                    <View style={styles.card}>
                    <View style={styles.horizontal}>
                        <View style={styles.imagecard} >
                            <Image source={require('../assets/photos/categories/fruits.jpg')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Fruits & Vegetables</Text>
                        </View>
                        <View style={styles.imagecard}>
                            <Image source={require('../assets/photos/categories/grain.png')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Grocery & Staples</Text>
                        </View>
                        <View style={styles.imagecard}>
                            <Image source={require('../assets/photos/categories/dairy.jpg')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Dairy & Bakers</Text>
                        </View>
                    </View>

                    <View style={styles.horizontal}>
                        <View style={styles.imagecard}>
                            <Image source={require('../assets/photos/categories/beverages.png')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Beverages</Text>
                        </View>
                        <View style={styles.imagecard}>
                            <Image source={require('../assets/photos/categories/beauty.jpg')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Personal Care</Text>
                        </View>
                        <View style={styles.imagecard}>
                            <Image source={require('../assets/photos/categories/babycare.png')} style={styles.image}/>
                            <Text style={{color:"black",fontSize:12,fontWeight:'bold'}}>Baby Care</Text>
                        </View>    
                    </View>
                    </View>

                </View>    
            </View>
            </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding:10,
        backgroundColor:'#F2F2F2',
        
       
    },
    card:{
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        width:"100%",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:10,
        
    },
    imagecard:{
        backgroundColor: 'white',
        width:"33%",
        height:100,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        
    },
    image:{
        width:"100%",
        height:70,
        marginBottom:5
    },
    imagenew:{
        width:"100%",
        height:180,
        borderRadius:5,
    },
    horizontal:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        marginVertical:10,
        paddingHorizontal:5,
        alignItems:'center',
    }
})