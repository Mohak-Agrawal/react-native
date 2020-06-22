
import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,ToastAndroid
} from 'react-native'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class LoginScreen extends Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    otpSent:false
  }
  
  validatePhoneNumber = () => {
    if(this.state.phone.length==10){
      return(true)
    }
  }

  handleSendCode = () => {
    // Request to send OTP
   if (this.validatePhoneNumber()) {
        auth()
        .signInWithPhoneNumber("+91"+(this.state.phone))
        .then(otpSent => {
          this.setState({ otpSent })
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
          //this.state.otpSent=true
        })
    } else {
     alert('Invalid Phone Number')
    }
  }

  

  handleVerifyCode = () => {
    // Request for OTP verification
    const { otpSent, verificationCode } = this.state
    if (verificationCode.length == 6) {
        otpSent
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid })
          ToastAndroid.show("Phone Number Verified", ToastAndroid.SHORT);
          const uid = auth().currentUser.uid
          firestore().collection('Users').doc(uid).get().then(doc => {
            if (doc.exists) {
                this.setState({otpSent:false})
                console.log("logged in")
                ToastAndroid.show("Logging you in", ToastAndroid.SHORT);
                this.props.navigation.navigate('Tab')
            } else {
              console.log("Signup")
                this.props.navigation.navigate('Signup')
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      });
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Icon name='local-mall' size={80} color='#16A085' style={{position:'absolute',top:80}}/>
          {!this.state.otpSent?
            <View style={styles.card}>
            <Text style={{color:'#16A085',marginBottom:20}}>May I ask your phone number?</Text>
            <TextInput
                style={styles.textInput}
                label="Phone Number"
                mode='flat'
                theme={{ colors: { primary: '#16A085'}}}
                keyboardType='numeric'
                value={this.state.phone}
                onChangeText={phone => {
                this.setState({ phone })
                }}
                maxLength={10}
                editable={this.state.otpSent ? false : true}
            />
            <TouchableOpacity
            style={styles.themeButton}
            onPress={this.handleSendCode}>
                <Text style={styles.themeButtonTitle}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.card}>
              <TextInput
                style={styles.textInput}
                label='Otp'
                mode="flat"
                theme={{ colors: { primary: '#16A085'}}}
                value={this.state.verificationCode}
                keyboardType='numeric'
                onChangeText={verificationCode => {
                    this.setState({ verificationCode })
                }}
                maxLength={6}
                />
                <TouchableOpacity
                style={styles.themeButton}
                onPress={this.handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
          </View>}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
    textInput: {
    width: '90%',
    fontSize: 16,
    backgroundColor:'white',
    marginBottom:40
  },
  themeButton: {
    width: '90%',
    height: 40,
    marginBottom:20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A085',
    elevation:10,
    borderRadius:5,

  },
  themeButtonTitle: {
    fontSize: 14,
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  card:{
    elevation: 3,
    alignItems:'center',
    paddingVertical:40,
    paddingHorizontal:10,
    justifyContent:"space-evenly",
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    width:"90%",
    borderRadius:10,
    shadowOpacity: 0.3,
    shadowRadius: 2},
})

export default LoginScreen

