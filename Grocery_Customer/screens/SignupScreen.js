import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';

export default class SignupScreen extends Component {

    constructor(props) {
        super(props);
          this.state = {
            phoneNumber:null,
            emailAddress:'',
            name:'',
            uid:'',
          }
        }

    componentDidMount(){
        const phoneNumber = auth().currentUser.phoneNumber
        const uid = auth().currentUser.uid
        this.setState({phoneNumber:phoneNumber,uid:uid})
    }

    submitCredentials = () => {
        let{phoneNumber,emailAddress,name,uid}=this.state
        firestore().collection('Users').doc(uid).
                set({
                    name:name,
                    phoneNumber:phoneNumber,
                    emailAddress:emailAddress,
                    uid:uid
                }).then(() => {
                    this.props.navigation.navigate('Tab')
                    console.log('added')
                })
                
                
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header style={{backgroundColor:'white'}}>   
                <Appbar.Action icon="keyboard-backspace" size={24} color={'#16A085'} onPress={()=>this.props.navigation.goBack()} />
                <Appbar.Content title="SIGN UP" />
                </Appbar.Header>
                <TextInput
                style={styles.textInput}
                label="Phone Number"
                mode='flat'
                theme={{ colors: { primary: '#16A085'}}}
                keyboardType='numeric'
                value={this.state.phoneNumber}
                editable={false}
                
                />
                <TextInput
                    style={styles.textInput}
                    label="Email Address"
                    mode='flat'
                    theme={{ colors: { primary: '#16A085'}}}
                    keyboardType='email-address'
                    value={this.state.emailAddress}
                    onChangeText={emailAddress => {
                    this.setState({ emailAddress })
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    label="Name"
                    mode='flat'
                    theme={{ colors: { primary: '#16A085'}}}
                    keyboardType='default'
                    value={this.state.name}
                    onChangeText={name => {
                    this.setState({ name })
                    }}
                />
                
                <TouchableOpacity style={styles.themeButton}  onPress={() => this.submitCredentials()}>
                    <Text style={{fontSize:14,color:'white'}}>SUBMIT</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    textInput: {
        width: '90%',
        fontSize: 16,
        backgroundColor:'white',
        marginVertical:20,
        alignSelf:'center'
      },
      themeButton: {
        width: '90%',
        height: 50,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16A085',
        elevation:10,
        borderRadius:5,
        marginVertical:30,
        alignSelf:'center'}
})
