import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import FontAwesome from '@expo/vector-icons/FontAwesome6';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const {tripData,setTripData}=useContext(CreateTripContext)
  const router=useRouter()

  useEffect(()=>{
    navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
    })
  },[])
  
    return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'#fff',
        height:'100%',
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'ubuntu-bold',
      }}>Review your trip</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'ubuntu',
            fontSize:20
        }}>Before generating the trip, please review your selection</Text>
      

      {/*DESTIONATION */}
      <View style={{
        marginTop:40,
        display:'flex',
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        backgroundColor:'#D3D3D3',
        borderRadius:15,
        padding:10
      }}>
      <Ionicons name="location-sharp" size={34} color="black" />
      <View>
        <Text style={{
          fontFamily:'Monst',
          fontSize:18,
          color:'#151515'
        }}>Destination</Text>
        <Text style={{
          fontFamily:'Monst-med',
          fontSize:18
        }}>{tripData?.locationInfo?.name}</Text>
      </View>
      </View>
      
        {/*DATE*/}
      <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        backgroundColor:'#D3D3D3',
        borderRadius:15,
        padding:10
      }}>
      <Ionicons name="calendar-clear" size={34} color="black" />
      <View>
        <Text style={{
          fontFamily:'Monst',
          fontSize:18,
          color:'#151515'
        }}>Travel Date</Text>
        <Text style={{
          fontFamily:'Monst-med',
          fontSize:18
        }}>{moment(tripData?.startDate).format('DD MMM')+" to "+moment(tripData.endDate).format('DD MMM')+" "}
        ({tripData?.totalnoOfDays} days)
        </Text>
      </View>
      </View>


        {/*Travelers*/}
      <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        backgroundColor:'#D3D3D3',
        borderRadius:15,
        padding:10
      }}>
      <Ionicons name="people" size={34} color="black" />
      <View>
        <Text style={{
          fontFamily:'Monst',
          fontSize:18,
          color:'#151515'
        }}>Travelers</Text>
        <Text style={{
          fontFamily:'Monst-med',
          fontSize:18
        }}>{tripData?.travelerCount?.title}
        </Text>
      </View>
      </View>


        {/*Budget*/}
        <View style={{
        marginTop:25,
        display:'flex',
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        backgroundColor:'#D3D3D3',
        borderRadius:15,
        padding:10
      }}>
      <FontAwesome name="sack-dollar" size={34} color="black" />
      <View>
        <Text style={{
          fontFamily:'Monst',
          fontSize:18,
          color:'#151515'
        }}>Budget</Text>
        <Text style={{
          fontFamily:'Monst-med',
          fontSize:18
        }}>{tripData?.budget}
        </Text>
      </View>
      </View>      

      </View>
      <TouchableOpacity
      onPress={()=>router.replace('/create-trip/generate-trip')}
      style={{
        padding:15,
        backgroundColor:"#000",
        borderRadius:15,
        marginTop:50
      }}>

        <Text style={{
          textAlign:'center',
          color:'#fff',
          fontFamily:'Monst',
          fontSize:18
        }}>
          Generate My Trip
        </Text>

      </TouchableOpacity>


    </View>


  )
}