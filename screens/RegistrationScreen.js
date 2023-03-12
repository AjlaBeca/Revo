import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setdisplayName] = useState("")
  const [lastName, setLastName] = useState("")

  registerUser = async (email, password, displayName, lastName) => {
    let highScore = 0;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://revo-cb87f.firebaseapp.com",
        })
          .then(() => {
            alert("Verification email sent")
            firebase.firestore().collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                displayName,
                lastName,
                email,
                highScore,
              })
          }).catch(error => {
            alert(error.message)
          })
      })
      .catch(error => {
        alert(error.message)
      })
    navigation.navigate('HomeScreen')
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
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Upišite vašu lozinku..."
          style={styles.input}
          secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
        />
         <TextInput
         mode="outlined"
          placeholder="Ime:"
          style={styles.input}
          onChangeText={(displayName) => setdisplayName(displayName)}
          autoCorrect={false}
        />
        <TextInput
        mode="outlined"
          placeholder="Prezime:"
          style={styles.input}
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Button mode="contained" onPress={() => registerUser(email, password, displayName, lastName)}>
          Registruj se
        </Button>
        <Button onPress={() => navigation.navigate('Login')}>
        Back
      </Button>
      </View>
    </View>
  )

}

export default RegistrationScreen

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
})