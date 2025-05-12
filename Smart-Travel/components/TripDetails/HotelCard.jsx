import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const fallbackImage = 'https://via.placeholder.com/400x300.png?text=No+Image';

export default function HotelCard({ item }) {
  const [photoUrl, setPhotoUrl] = useState(fallbackImage);

  useEffect(() => {
    fetchPhotoByHotelName(item.hotelName);
  }, [item.hotelName]);

  const fetchPhotoByHotelName = async (hotelName) => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

      // Step 1: Get Place ID using hotel name
      const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        hotelName
      )}&inputtype=textquery&fields=place_id&key=${apiKey}`;

      const placeSearchRes = await fetch(placeSearchUrl);
      const placeSearchData = await placeSearchRes.json();

      if (
        placeSearchData?.candidates &&
        placeSearchData.candidates.length > 0
      ) {
        const placeId = placeSearchData.candidates[0].place_id;

        // Step 2: Get Place Details to retrieve photo reference
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;

        const placeDetailsRes = await fetch(placeDetailsUrl);
        const placeDetailsData = await placeDetailsRes.json();

        const photos = placeDetailsData?.result?.photos;
        if (photos && photos.length > 0) {
          const photoRef = photos[0].photo_reference;

          // Step 3: Construct Photo URL
          const photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`;
          setPhotoUrl(photo);
        }
      }
    } catch (error) {
      console.error('Error fetching hotel photo:', error);
      setPhotoUrl(fallbackImage);
    }
  };

  return (
    <View
      style={{
        marginRight: 20,
        width: 180,
        borderRadius: 15,
        borderColor: '#D3D3D3',
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: photoUrl }}
        style={{
          width: 160,
          height: 120,
          borderRadius: 15,
          resizeMode: 'cover',
        }}
        onError={() => setPhotoUrl(fallbackImage)}
      />

      <View style={{ padding: 5 }}>
        <Text style={{ fontFamily: 'ubuntu', fontSize: 15 }}>
          {item.hotelName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontFamily: 'ubuntu' }}>
            <FontAwesome name="star" size={14} color="black" /> {item.rating || 'N/A'}
          </Text>
          <Text style={{ fontFamily: 'ubuntu' }}>
            <FontAwesome name="dollar" size={14} color="black" />{' '}
            {item?.price?.estimatedPricePerNight || 'N/A'} USD
          </Text>
        </View>
      </View>
    </View>
  );
}
