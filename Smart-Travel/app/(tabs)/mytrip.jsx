import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {auth, db} from './../../configs/FirebaseConfig'
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';



export default function MyTrip() {

  const [userTrips, setUserTrips] = useState([]);
  const user=auth.currentUser;
  const [loading,setLoading] = useState(false);

  const router = useRouter();

  useEffect(()=>{
    user&&GetMyTrips();
  },[user])

  const GetMyTrips=async()=>{
    setLoading(true);
    setUserTrips([]);
    const q=query(collection(db,'UserTrips'),where('userEmail','==',user?.email))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
    });
    setLoading(false);
  }


  return (
    <ScrollView style={{
      backgroundColor: '#fff',
      height:'100%'
    }}
    
    contentContainerStyle={{ 
      padding: 25, 
      paddingTop: 35, 
      paddingBottom: 100 // ✅ Added padding to prevent cutting off the last item
    }}>

      
      <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }}
      >
      <Text style={{
        fontFamily:'ubuntu-bold',
        fontSize: 32
      }}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push('create-trip/search-place')}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
    </View>

    {loading&&<ActivityIndicator size={'large'} color='#000'/>}

    {userTrips?.length==0?
      <StartNewTripCard/>
      :
      <UserTripList userTrips={userTrips}/>
    }
    </ScrollView>
  )
}