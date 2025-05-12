import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function OptionCard({option,selectedOption}) {
  return (
    <View style={[{
        padding:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#D3D3D3',
        borderRadius:15
    },selectedOption?.id==option?.id&&{borderWidth:1}]}>
        <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily:'Monst-med'
            }}>{option?.title}</Text>
            <Text style={{
                fontSize: 17,
                fontFamily:'Monst',
                color:'#666'
            }}>{option?.desc}</Text>

            
        </View>

        <Text style={{
            fontSize: 70,
            marginTop:30
        }}>{option.icon}</Text>
    </View>
  )
}