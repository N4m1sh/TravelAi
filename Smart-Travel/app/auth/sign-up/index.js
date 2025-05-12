import { View, Text, StyleSheet,TextInput,TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../configs/FirebaseConfig';

export default function Signup() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setfullName] = useState();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])


const OnCreateAccount=()=>{

  if(!email&&!password&&!fullName){
    ToastAndroid.show('Please enter all the details',ToastAndroid.LONG);
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("--",errorMessage, errorCode);
    // ..
  });
}


  return (
  
    <View
    style={{
      padding:25,
      paddingTop:30,
      backgroundColor:'#fff',
      height:'100%'
    }}
    >
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />          
      </TouchableOpacity>
      <Text style={{
        fontFamily:'Monst-med',
        fontSize:30,
        marginTop:30
      }}>Create New Account</Text>
    


    <View style ={{
        marginTop:20,
        }}>
        <Text style = {{
          fontFamily:'Monst'
        }}> Your Full Name</Text>
        <TextInput
        style = {styles.input}placeholder='Enter Full Name'
        onChangeText={(value)=>setfullName(value)}
        />
      </View>


     <View style ={{
        marginTop:20,
 
        }}>
        <Text style = {{
          fontFamily:'Monst'
        }}> Email</Text>
        <TextInput 
        style = {styles.input}placeholder='Enter Email'
        onChangeText={(value)=>setEmail(value)}
        />
      </View>

      <View style ={{
        marginTop:20,
        }}>
        <Text style = {{
          fontFamily:'Monst'
        }}> Password</Text>
        <TextInput
        secureTextEntry={true}
        style = {styles.input}placeholder='Enter Password'
        onChangeText={(value)=>setPassword(value)}
        />
      </View>


      <TouchableOpacity onPress={OnCreateAccount} style = {{
        padding:20,
        backgroundColor:'#000',
        borderRadius:15,
        marginTop:50
      }}>
        <Text style={{
          color:'#fff',
          textAlign:'center'
        }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-in')}
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
        }}>Sign In</Text>
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