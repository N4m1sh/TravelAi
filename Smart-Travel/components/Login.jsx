import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import colors from './../constants/Colors'
import { useRouter } from 'expo-router'
import { Video } from 'expo-av'

const { width } = Dimensions.get('window');

const Login = () => {
  const router = useRouter();

  return (
    <View>
      <View>
        <Video
          source={require('./../assets/images/explore india.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: width, height: 520 }}
        />
      </View>

      <View style={styles.container}>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'ubuntu-bold',
          fontSize: 30
        }}>Smart-Travel</Text>

        <Text style={{
          textAlign: 'center',
          fontFamily: 'ubuntu',
          fontSize: 20,
          marginTop: 8
        }}>AI-Powered Trip Planner</Text>

        <Text style={{
          fontFamily: 'Monst',
          fontSize: 15,
          textAlign: 'center',
          marginTop: '3%'
        }}>
          Discover your next adventure effortlessly, personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button}
          onPress={() => router.push('/auth/sign-in')}>
          <Text style={{
            color: colors.white,
            fontFamily: 'Monst-med',
            textAlign: 'center',
            fontSize: 18
          }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightblu,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 25
  },

  button: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: '9%'
  }
})
