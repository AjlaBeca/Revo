import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { firebase } from '../config'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // const checkIfLoggedIn = async () => {
  //   const token = await AsyncStorage.getItem('authToken');
  //   if (token) {
  //     navigation.navigate('HomeScreen');
  //   }
  // }

  // useEffect(() => {
  //   checkIfLoggedIn();
  // }, []);

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // const user = firebase.auth().currentUser;
      // console.log(user);
      // const token = await user.getIdToken();
      // await AsyncStorage.setItem('authToken', token);
      navigation.navigate('HomeScreen');
    } catch (error) {
      alert(error.message)
    }
  }
  const logoutUser = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Upišite vaš email..."
          style={styles.input}
          value={email}
          autoCapitalize="none"      
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Upišite vašu lozinku..."
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button mode="contained" onPress={() => loginUser(email, password)}>
        LOG IN
      </Button>
      <Button onPress={() => navigation.navigate('Register')}>
        Register
      </Button>
    </View>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,

  },
  input: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  ButtonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {

  },
  buttonOutline: {

  },
  buttonOutlineText: {

  },
  buttonText: {

  },
})
