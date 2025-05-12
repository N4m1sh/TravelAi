import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

export default function UserTripCard({ trip }) {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(null);

    const formatData = (data) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
        }
    };

    const tripData = formatData(trip.tripData);
    const startDate = tripData[3]; 
    const travelerType = tripData[10] || 'N/A'; 
    const location = (trip.tripPlan?.tripDetails?.location || 'travel').trim();

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(location)}&inputtype=textquery&fields=place_id&key=${GOOGLE_MAPS_API_KEY}`;
                const searchRes = await fetch(searchUrl);
                const searchData = await searchRes.json();

                const placeId = searchData?.candidates?.[0]?.place_id;
                if (!placeId) throw new Error('Place ID not found');

                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;
                const detailsRes = await fetch(detailsUrl);
                const detailsData = await detailsRes.json();

                const photoRef = detailsData?.result?.photos?.[0]?.photo_reference;
                if (!photoRef) throw new Error('Photo reference not found');

                const finalPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
                setPhotoUrl(finalPhotoUrl);
            } catch (error) {
                console.error("Image fetch error:", error);
                setImageError(true);
            }
        };

        fetchPhoto();
    }, [location]);

    return (
        <View style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: '#fff',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    gap: 10,
                    flex: 1
                }}>
                    <Image 
                        source={
                            imageError || !photoUrl
                                ? require('./../../assets/images/login.jpg')
                                : { uri: photoUrl }
                        }
                        onError={() => setImageError(true)}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15,
                            backgroundColor: '#ccc'
                        }}
                        resizeMode="cover"
                    />

                    <View style={{ flex: 1 }}> 
                        <Text 
                            style={{
                                fontFamily: 'ubuntu',
                                fontSize: 18
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {location}
                        </Text>

                        <Text style={{
                            fontFamily: 'ubuntu',
                            fontSize: 14,
                            color: '#808080'
                        }}>
                            {startDate ? moment(startDate).format('DD MMM YYYY') : 'N/A'}
                        </Text>
                        <Text style={{
                            fontFamily: 'ubuntu',
                            fontSize: 14,
                            color: '#808080'
                        }}>
                            Traveling: {travelerType}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity  
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: {
                            trip: JSON.stringify(trip)
                        }
                    })}
                >
                    <MaterialCommunityIcons name="arrow-right-box" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
