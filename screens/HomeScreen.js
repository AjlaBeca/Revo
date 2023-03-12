import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { firebase } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then(token => {
        if (!token) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const logoutUser = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  let username = firebase.auth().currentUser ? firebase.auth().currentUser.email.split('@')[0] : '';
  username = username.split('@')[0];


  <TouchableOpacity
    onPress={() => {
      AsyncStorage.removeItem('authToken');
      firebase.auth().signOut();
    }}
    style={styles.button}>
    <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
      Sign out
    </Text>
  </TouchableOpacity>


  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, textAlign: 'center', marginVertical: 20 }}>
        Hello, {username}!
      </Text>
      <View style={styles.com}>
        <TouchableOpacity onPress={() => navigation.navigate('RedClick')}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Card.Title style={styles.mojtext} title="RedClick" subtitle="Click and Win" />
              <Card.Content>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              </Card.Content>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Card.Cover source={require('../Puzzle-pana.png')} style={styles.cover} />
            </View>
          </Card>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Breathe')}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Card.Title style={styles.mojtext} title="Breathe" subtitle="Breathe and Relax" />
              <Card.Content>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              </Card.Content>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Card.Cover source={require('../Breathing.png')} style={styles.cover} />
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <Button style={styles.logut} onPress={logoutUser}>Log Out</Button>


    </SafeAreaView >
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  logut: {
marginTop: 150,

  },
  com: {
    flrex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 50
  },
  card: {
    flexDirection: 'row',
    margin: 16,
  },
  cardContent: {
    flex: 1,
  },
  cover: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent'
  },
  mojtext: {
    paddingTop: 85,
    zIndex: 5,
    color: "black",
    fontWeight: 'bold',
  }
});