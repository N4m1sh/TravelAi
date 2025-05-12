import 'react-native-get-random-values';
import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search'
        });
    }, []);

    useEffect(() => {
        console.log(tripData);
    }, [tripData]);

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 75,
                backgroundColor: '#fff',
                height: '100%'
            }}>
            <GooglePlacesAutocomplete
                placeholder='Search Place'
                fetchDetails={true}
                onPress={async (data, details = null) => {
                    try {
                        console.log(data.description);
                        console.log(details?.geometry.location);
                        console.log(details?.photos[0]?.photo_reference);
                        console.log(details?.url);

                        setTripData({
                            locationInfo: {
                                name: data.description,
                                coordinates: details?.geometry.location,
                                photoRef: details?.photos[0]?.photo_reference,
                                url: details?.url
                            }
                        });

                        router.push('/create-trip/select-traveler');
                    } catch (error) {
                        console.error("Error fetching place details:", error);
                        if (error.response) {
                            console.log(error.response);
                        }
                    }
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 25
                    }
                }}
            />
        </View>
    );
}
