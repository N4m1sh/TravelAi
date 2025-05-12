import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GetPhotoRef } from '../../services/GooglePlaceApi';
import HotelCard from './HotelCard';

export default function HotelList({hotelList}) {




  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontFamily:'ubuntu',
        fontSize: 20,
      }}><FontAwesome6 name="hotel" size={20} color="black" />  Hotel Recommendations</Text>

      <FlatList
        data={hotelList}
        style={{
            marginTop:8
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item,index})=>(
            <HotelCard item={item}/>
        )}
      />
    </View>
  )
}