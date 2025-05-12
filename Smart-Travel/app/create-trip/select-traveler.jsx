import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { Link, useNavigation } from 'expo-router'
import { FlatList } from 'react-native';
import {SelectTravalerList} from './../../constants/Options'
import OptionCard from './../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {

    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState([]);
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle: '',
        })
    },[])


    useEffect(()=>{
      setTripData({...tripData,
        travelerCount:selectedTraveler
      })
    },[selectedTraveler])


    useEffect(()=>{
      console.log(tripData);
    },[tripData])


  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'ubuntu-bold',
      }}>Who's Traveling ?</Text>

      <View style={{
        marginTop:20,
      }}>
        <Text style={{
          fontFamily:'ubuntu',
          fontSize:20,
          marginBottom:10
        }}>Choose your travellers</Text>

        <FlatList
          data ={SelectTravalerList}
          renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>setSelectedTraveler(item)}
            style={{
              marginVertical:8
            }}>
              <OptionCard option={item} selectedOption={selectedTraveler}/>
            </TouchableOpacity>
          )}
        />
      </View>


      <TouchableOpacity
      style={{
        padding:15,
        backgroundColor:"#000",
        borderRadius:15,
        marginTop:30
      }}>
      <Link href={'/create-trip/select-dates'}
      style={{
        width:'100%',
        textAlign:'center'  
      }}
      >
        <Text style={{
          textAlign:'center',
          color:'#fff',
          fontFamily:'Monst',
          fontSize:18
        }}>
          Continue
        </Text>
        </Link>
      </TouchableOpacity>
  
    </View>
    
  )
}