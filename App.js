import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import RedClick from './screens/RedClick';
import Breathe from './screens/Breathe';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={RegistrationScreen} />
        <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="RedClick" component={RedClick} />
        <Stack.Screen options={{headerShown:false}} name="Breathe" component={Breathe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
