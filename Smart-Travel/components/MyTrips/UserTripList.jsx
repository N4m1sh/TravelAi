import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

export default function UserTripList({ userTrips }) {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageError, setImageError] = useState(false);

    const LatestTrip = JSON.parse(userTrips[0].tripData);
    const location = (userTrips[0]?.tripPlan?.tripDetails?.location || 'travel').trim();
    const startDate = LatestTrip[3];
    const endDate = LatestTrip[4];

    const traveler = typeof LatestTrip[10] === 'string'
        ? LatestTrip[10]
        : JSON.stringify(LatestTrip[10]);

    useEffect(() => {
        const fetchPhotoUrl = async () => {
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
                console.error("Image fetch error:", error);
                setImageError(true);
            }
        };

        fetchPhotoUrl();
    }, [location]);

    return userTrips && (
        <View style={{ marginTop: 20 }}>
            <Image
                source={
                    imageError || !imageUrl
                        ? require('./../../assets/images/login.jpg')
                        : { uri: imageUrl }
                }
                style={{
                    width: '100%',
                    height: 240,
                    resizeMode: 'cover',
                    borderRadius: 15,
                }}
                onError={() => setImageError(true)}
            />

            <View style={{ marginTop: 10 }}>
                <Text style={{
                    fontFamily: 'ubuntu-bold',
                    fontSize: 20
                }}>
                    {location}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5
                }}>
                    <Text style={{
                        fontFamily: 'ubuntu',
                        fontSize: 15,
                        color: '#808080'
                    }}>
                        {moment(startDate).format('DD MMM YYYY')}
                    </Text>

                    <Text style={{
                        fontFamily: 'ubuntu',
                        fontSize: 15,
                        color: '#808080'
                    }}>
                        {traveler}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: {
                            trip: JSON.stringify(userTrips[0])
                        }
                    })}
                    style={{
                        backgroundColor: '#000',
                        borderRadius: 15,
                        padding: 15,
                        marginTop: 10,
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontFamily: 'Monst',
                        fontSize: 15
                    }}>
                        See my plan
                    </Text>
                </TouchableOpacity>
            </View>

            {userTrips.map((trip, index) => (
                <UserTripCard trip={trip} key={index} />
            ))}
        </View>
    );
}
