import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function FlightInfo({flightdata}) {
  return (
    <View style={{
      marginTop: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    }}>

    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
    <Text style={{
        fontFamily:'ubuntu',
        fontSize:19,
      }}><MaterialCommunityIcons name="airplane" size={24} color="black" />  Flights</Text>
        
        <TouchableOpacity 
        onPress={() => {
          const url = `https://www.makemytrip.com/flights/`;
          Linking.openURL(url);
        }}

        style={{
        backgroundColor : '#000',
        padding: 5,
        width:100,
        borderRadius:7,
        marginTop:7
      }}>
        <Text style={{
            textAlign:'center',
            color:'#fff',
            fontFamily:'Monst',
            
        }}>Book Here</Text>
      </TouchableOpacity>

    </View>


      <Text style={{
        fontFamily:'ubuntu',
        fontSize:17,
        marginTop:7
      }}>Airline : Emirates</Text>
      <Text style={{
        fontFamily:'ubuntu',
        fontSize:17,
      }}>Price: {flightdata?.arrival?.flightPrice?.estimatedPrice} USD</Text>
      
    </View>
  )
}