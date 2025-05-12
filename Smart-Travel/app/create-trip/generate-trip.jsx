import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/Aimodel';
import { auth, db } from './../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { stringify } from 'flatted'; 
import { useRouter } from 'expo-router';

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, []);

  // Validate and parse JSON safely
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const GenerateAiTrip = async () => {
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.locationInfo?.name)
      .replace('{totalDay}', tripData?.totalnoOfDays)
      .replace('{totalNight}', tripData?.totalnoOfDays - 1)
      .replace('{traveler}', tripData?.travelerCount?.title)
      .replace('{budget}', tripData?.budget)
      .replace('{totalDay}', tripData?.totalnoOfDays)
      .replace('{totalNight}', tripData?.totalnoOfDays - 1);

    console.log("AI Prompt Sent:", FINAL_PROMPT);

    try {
      // Replace with your call to the AI model
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();

      console.log("Raw AI Response:", responseText);

      let tripResp;

      if (isValidJson(responseText)) {
        tripResp = JSON.parse(responseText);
      } else {
        console.warn("Invalid JSON. Wrapping into an object.");
        tripResp = { message: responseText };
      }

      console.log("Parsed AI Response:", tripResp);

      const docID = Date.now().toString();
      const cleanTripData = stringify(tripData);

      await setDoc(doc(db, "UserTrips", docID), {
        userEmail: user?.email,
        tripPlan: tripResp,
        tripData: cleanTripData,
        rawResponse: responseText,
        docID: docID
      });

      console.log("Document successfully written!");

      // ❗ Use a leading slash in the route
      try {
        router.push('/(tabs)/mytrip');
      } catch (navError) {
        console.error("Navigation error:", navError);
      }

    } catch (error) {
      console.error("Error in GenerateAiTrip:", error);
      try {
        router.push('/(tabs)/mytrip');
      } catch (navError) {
        console.error("Fallback navigation error:", navError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'ubuntu-bold',
        fontSize: 35,
        textAlign: 'center'
      }}>
        Hold On!
      </Text>

      <Text style={{
        fontFamily: 'ubuntu',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
      }}>
        We are generating your trip.
      </Text>

      <Image 
        source={require('./../../assets/images/he.gif')} 
        style={{ width: '100%', height: '60%', resizeMode: 'contain' }}
      />

      <Text style={{
        fontFamily: 'ubuntu',
        fontSize: 20,
        color: '#808080',
        textAlign: 'center',
      }}>
        Do not refresh
      </Text>
    </View>
  );
}

