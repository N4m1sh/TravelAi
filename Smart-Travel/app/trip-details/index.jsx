import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [imageError, setImageError] = useState(false);

    const localFallbackImage = require('../../assets/images/login.jpg');

    const formatData = (data) => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        });

        if (trip) {
            const parsedTrip = formatData(trip);
            setTripDetails(parsedTrip);
        }
    }, [trip]);

    const tripData = formatData(tripDetails?.tripData) || [];
    const startDate = tripData[3] || null;
    const endDate = tripData[4] || null;
    const travelerType = tripData[10] || 'N/A';

    const rawLocation = tripDetails?.tripPlan?.tripDetails?.location;
    const location = rawLocation?.trim() || 'India';

    useEffect(() => {
        const fetchImageFromGoogle = async () => {
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
                setImageUrl(finalPhotoUrl);
            } catch (error) {
                console.error('Google Maps Image Fetch Error:', error);
                setImageError(true);
            }
        };

        fetchImageFromGoogle();
    }, [location]);

    return tripDetails && (
        <ScrollView>
            <Image
                source={
                    imageError || !imageUrl
                        ? localFallbackImage
                        : { uri: imageUrl }
                }
                onError={() => setImageError(true)}
                style={{ width: '100%', height: 330 }}
                resizeMode="cover"
            />

            <View style={{
                padding: 15,
                backgroundColor: '#fff',
                minHeight: '100%',
                marginTop: -30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <Text style={{
                    fontSize: 25,
                    fontFamily: 'ubuntu-bold'
                }}>
                    {location || 'Unknown Location'}
                </Text>
                <TouchableOpacity>
                <MaterialIcons name="download-for-offline" size={34} color="black" />
                </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 5
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontFamily: 'ubuntu',
                        color: '#808080',
                        marginRight: 8
                    }}>
                        {startDate ? moment(startDate).format('DD MMM YYYY') : 'N/A'}
                    </Text>
                    <Text style={{
                        fontSize: 17,
                        fontFamily: 'ubuntu',
                        color: '#808080'
                    }}>
                        - {endDate ? moment(endDate).format('DD MMM YYYY') : 'N/A'}
                    </Text>
                </View>

                <Text style={{
                    fontFamily: 'ubuntu',
                    fontSize: 14,
                    color: '#808080',
                    marginTop: 4
                }}>
                    {travelerType}
                </Text>

                {/* FLIGHT INFO */}
                <FlightInfo flightdata={tripDetails?.tripPlan?.flights} />

                {/* HOTEL LISTS */}
                <HotelList hotelList={tripDetails?.tripPlan?.hotels} />

                {/* TRIP DAY PLANNER */}
                <PlannedTrip details={tripDetails?.tripPlan?.dailyPlan} />
            </View>
        </ScrollView>
    );
}