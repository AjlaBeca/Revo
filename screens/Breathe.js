import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");
const circleWidth = width / 2;
let counter = 0;

export default function Breathe() {
  const [showBravo, setShowBravo] = useState(false);
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const navigation = useNavigation();
  const resetGame = () => {
    counter = 0;
    setShowBravo(false);
  };

  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 100,
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ]),
    ])
  ).start();

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });

  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
 
   if (exhale == true){
    counter = counter + 1;
  }

  if (counter == 3){
    resetGame();
    return setShowBravo(true);
  }
  

  return (
    <View style={styles.container}>
    <View style={styles.buttonContainer}><Button onPress={() => navigation.navigate('HomeScreen')}>
        CLICK TO FINISH
      </Button></View>
       
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: textOpacity,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>
          Inhale
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: exhale,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "600" }}>Exhale</Text>
    

      </Animated.View>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });

        return (
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: "#d600d3",
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFill,
              transform: [
                {
                  rotateZ: rotation,
                },
                { translateX: translate },
                { translateY: translate },
              ],
            }}
          />
        );
      })}
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    left: width / 4,
    top: height / 2.5,
    fontSize: 28,
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign:"center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});