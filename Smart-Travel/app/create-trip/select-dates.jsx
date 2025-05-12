import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRoute } from '@react-navigation/native';

export default function SelectDate() {

    const navigation = useNavigation();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    const handleDateChange = (date,type) => {
      console.log(date,type);

      if(type=='START_DATE'){
        setStartDate(moment(date));
      }

      else{
        setEndDate(moment(date));
      }
  };

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])
    
    const OnDateSelectionContinue=()=>{

      if(!startDate&&!endDate){
        ToastAndroid.show('Please select both the dates',ToastAndroid.LONG)
        return;
      }
      const totalNoOfDays = endDate.diff(startDate,'days')
      console.log(totalNoOfDays+1);
      setTripData({
        ...tripData,
        startDate:startDate,
        endDate:endDate,
        totalnoOfDays:totalNoOfDays+1
      });

      router.push('/create-trip/select-budget')
    }


  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:"#fff",
        height:"100%",
    }}
    >
      <Text style={{
        fontFamily:'ubuntu-bold',
        fontSize:35,
      }}>Travel Dates</Text>


      <View style={{
        marginTop:30
      }}>
      <CalendarPicker 
         onDateChange={handleDateChange} // ✅ Correct usage
         allowRangeSelection= {true}
         minDate={new Date()}
         maxRangeDuration={10} //10 days for duration only
         selectedRangeStyle={{
          backgroundColor: '#000',
         }}
         selectedDayTextStyle={{
          color: '#fff',
         }}
       />
       </View>

      <TouchableOpacity
      onPress={OnDateSelectionContinue}
      style={{
        padding:15,
        backgroundColor:"#000",
        borderRadius:15,
        marginTop:35
      }}>

        <Text style={{
          textAlign:'center',
          color:'#fff',
          fontFamily:'Monst',
          fontSize:18
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  )
}