import { View, Text, TextInput,StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';



export default function Signin() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  },[])


  const onSignIn=()=>{

    if(!email && !password){
      ToastAndroid.show("Please Enter Email and Password", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
    if(errorCode=='auth/invalid-credential'){
      ToastAndroid.show("Invalid Email or Password", ToastAndroid.LONG);
    }
  });
  }

  return (
    <View style={{
      padding:25,
      paddingTop:30,
      backgroundColor:'#fff',
      height:'100%'
      }}>
        <TouchableOpacity onPress={()=>router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />          
        </TouchableOpacity>

      <Text style={{
        fontFamily:'Monst-med',
        fontSize:30,
        marginTop:30
      }}>Let's Sign You In</Text>

      <Text style={{
        fontFamily:'Monst',
        fontSize:30,
        marginTop:20
      }}>Welcome Back</Text>

      <Text style={{
        fontFamily:'Monst',
        fontSize:25,
        color : '#000',
        marginTop:10
      }}>We missed You!</Text>

        
      <View style ={{
        marginTop:50
        }}>
        <Text style = {{
          fontFamily:'Monst'
        }}> Email</Text>
        <TextInput 
        style = {styles.input}
        onChangeText={(value)=>setEmail(value)}
        placeholder='Enter Email'/>
      </View>

      <View style ={{
        marginTop:20
        }}>
        <Text style = {{
          fontFamily:'Monst'
        }}> Password</Text>
        <TextInput
        secureTextEntry={true}
        style = {styles.input}
        onChangeText={(value)=>setPassword(value)}
        placeholder='Enter Password'/>
      </View>


      <TouchableOpacity onPress={onSignIn} style = {{
        padding:20,
        backgroundColor:'#000',
        borderRadius:15,
        marginTop:50
      }}>
        <Text style={{
          color:'#fff',
          textAlign:'center'
        }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-up')}
      style = {{
        padding:20,
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:20,
        borderWidth:1
      }}>
        <Text style={{
          color:'#000',
          textAlign:'center'
        }}>Create Your Account</Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding : 15,
    borderWidth:1,
    borderRadius:15,
    borderColor:'#000',
    fontFamily:'Monst'
    
  }

})