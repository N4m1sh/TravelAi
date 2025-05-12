import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const fallbackImage = 'https://via.placeholder.com/400x300.png?text=No+Image';

export default function PlannedTrip({ details }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [photoUrls, setPhotoUrls] = useState({});

  useEffect(() => {
    if (!details) return;

    const fetchAllImages = async () => {
      const allPlaces = [];

      Object.values(details).forEach(dayActivities => {
        Object.values(dayActivities).forEach(activityGroup => {
          Object.values(activityGroup).forEach(activity => {
            if (activity.place && !photoUrls[activity.place]) {
              allPlaces.push(activity.place);
            }
          });
        });
      });

      const updatedPhotos = { ...photoUrls };
      await Promise.all(
        allPlaces.map(async (place) => {
          updatedPhotos[place] = await fetchPhoto(place);
        })
      );

      setPhotoUrls(updatedPhotos);
    };

    fetchAllImages();
  }, [details]);

  const fetchPhoto = async (placeName) => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

      const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        placeName
      )}&inputtype=textquery&fields=place_id&key=${apiKey}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData?.candidates?.length > 0) {
        const placeId = searchData.candidates[0].place_id;

        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        const photoRef = detailsData?.result?.photos?.[0]?.photo_reference;
        if (photoRef) {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`;
        }
      }
    } catch (err) {
      console.error('Error fetching photo for:', placeName, err);
    }
    return fallbackImage;
  };

  if (!details || Object.keys(details).length === 0) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: 'ubuntu' }}>
          <Entypo name="basecamp" size={24} color="black" /> No Plan Available
        </Text>
      </View>
    );
  }

  const daysArray = Object.entries(details);

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: 'ubuntu', marginBottom: 10 }}>
        <Entypo name="basecamp" size={24} color="black" /> Daily Plan
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
        {daysArray.map(([day, _], index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDayIndex(index)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 15,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: selectedDayIndex === index ? '#000' : '#d4d4d4',
            }}
          >
            <Text style={{ color: selectedDayIndex === index ? 'white' : '#000', fontWeight: 'bold' }}>
              Day {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {(() => {
        const [_, activities] = daysArray[selectedDayIndex];
        const validActivities = Object.values(activities).filter(activity =>
          Object.values(activity).some(item => item.place || item.description || item.bestTimeToVisit || item.duration || item.notes)
        );

        if (validActivities.length === 0) {
          return <Text style={{ fontSize: 16, fontStyle: 'italic', color: 'gray' }}>No activities planned for this day.</Text>;
        }

        return (
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{`Day ${selectedDayIndex + 1}`}</Text>
            {validActivities.map((activity, i) =>
              Object.values(activity).map((item, j) => {
                if (!(item.place || item.description || item.bestTimeToVisit || item.duration || item.notes)) return null;

                return (
                  <View key={j} style={{ marginBottom: 5 }}>
                    <View style={{
                      marginTop: 20,
                      padding: 10,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 15,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      elevation: 3,
                    }}>
                      {item.place && (
                        <>
                          <Image
                            source={{ uri: photoUrls[item.place] || fallbackImage }}
                            style={{ width: '100%', height: 120, borderRadius: 15 }}
                          />
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 8
                          }}>
                            <Text style={{ fontSize: 20, fontFamily: 'ubuntu', flex: 1 }}>{item.place}</Text>
                            <TouchableOpacity
                              style={{ marginLeft: 10 }}
                              onPress={() => {
                                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place)}`;
                                Linking.openURL(url);
                              }}
                            >
                              <Ionicons name="navigate-circle" size={34} color="black" />
                            </TouchableOpacity>
                          </View>
                        </>
                      )}

                      {item.description && (
                        <Text style={{ fontFamily: 'ubuntu', fontSize: 14, color: '#808080', marginTop: 8 }}>
                          <Entypo name="info" size={15} color="black" /> Info: {item.description}
                        </Text>
                      )}

                      {item.bestTimeToVisit && (
                        <Text style={{ fontFamily: 'ubuntu', fontSize: 14, color: '#808080', marginTop: 8 }}>
                          Best time to visit: {item.bestTimeToVisit}
                        </Text>
                      )}
                      {item.duration && (
                        <Text style={{ fontFamily: 'ubuntu', fontSize: 14, color: '#808080', marginTop: 8 }}>
                          <AntDesign name="clockcircle" size={15} color="black" /> Duration: {item.duration}
                        </Text>
                      )}
                      {item.notes && (
                        <Text style={{ fontFamily: 'ubuntu', fontSize: 14, color: '#808080', marginTop: 8 }}>
                          Note: {item.notes}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })
            )}
          </View>
        );
      })()}
    </View>
  );
}
