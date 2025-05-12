import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {


  const router = useRouter();

  return (
    <View 
    style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:20
    }}
    >
        <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'ubuntu',
      }}>No trips planned yet !</Text>

    <Text style={{
        fontSize:20,
        fontFamily:'Monst-Med',
        textAlign:'center',
        color:'#808080'
      }}>Looks like it's time to plan {'\n'} 
      a new travel experience !{'\n'}{'\n'}
      Get Started Below</Text>

      <TouchableOpacity
      onPress={()=>router.push('/create-trip/search-place')}
      style={{
        padding:15,
        backgroundColor:'#000',
        borderRadius:15,
        paddingHorizontal:36,
        marginTop:15
      }}>

      <Text
      style={{
        color:'#fff',
        fontFamily:'Monst',
        fontSize:18
      }}>
        Start a new trip
      </Text>

      </TouchableOpacity>
    </View>
  )
}


