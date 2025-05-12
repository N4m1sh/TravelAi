import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { FlatList } from 'react-native';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {

    const navigation = useNavigation();
    const [selectedOption,setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[]);


    useEffect(()=>{
        selectedOption&&setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])


    const onClickContinue=()=>{
        if(!selectedOption){
            ToastAndroid.show('Select Your Budget',ToastAndroid.LONG)
            return;
        }

        router.push('/create-trip/review-trip')
    }
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'ubuntu-bold',
        fontSize:35
      }}>Whats' Your Budget?</Text>

        <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontFamily:'ubuntu',
                fontSize:20,
                marginBottom:10
            }}>Choose spending habit for your trip</Text>
        
        <FlatList
        data={SelectBudgetOptions}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{
                marginVertical:10
            }}
            
            onPress={()=>setSelectedOption(item)}>
                <OptionCard option={item} selectedOption={selectedOption}/>
            </TouchableOpacity>
        )}
        />
        
        </View>


      <TouchableOpacity
      onPress={()=>onClickContinue()}
      style={{
        padding:15,
        backgroundColor:"#000",
        borderRadius:15,
        marginTop:30
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