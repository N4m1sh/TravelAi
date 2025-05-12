import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { requireNativeComponent } from "react-native";
import {CreateTripContext} from '../context/CreateTripContext'
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    'Monst' : require('./../assets/fonts/Montserrat-Regular.ttf'),
    'Monst-med' : require('./../assets/fonts/Montserrat-Medium.ttf'),
    'ubuntu' : require('./../assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold' : require('./../assets/fonts/Ubuntu-Bold.ttf'),
    'Space-mono' : require('./../assets/fonts/SpaceMono-Regular.ttf')
  })

  const [tripData,setTripData]=useState([]);
  
  return (


    <CreateTripContext.Provider value={{tripData,setTripData}}>

    <Stack screenOptions={{
      headerShown: false
    }}>

         {/*<Stack.Screen name="index" options={{
          headerShown:false
        }}/>*/}

  <Stack.Screen name="(tabs)"/>
  </Stack>
  </CreateTripContext.Provider>
); 
}
