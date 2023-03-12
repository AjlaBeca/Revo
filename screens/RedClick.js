import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Button,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { firebase } from '../config'


const colors = ["red", "green", "blue"];
let i = 0;
let o = 0;
let j = 0;
const generateColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

export default function RedClick({ navigation }) {
  const [balloons, setBalloons] = useState([]);
  const [showBravo, setShowBravo] = useState(false);
  let [count, setCount] = useState(0);
  const scrollViewRef = useRef(null);
  const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(text);

  const resetGame = () => {
    console.log(firebase.auth().currentUser)
    userId = firebase.auth().currentUser.uid;
    db = firebase.firestore();
    console.log(userId)
    console.log(db)
    // Get the document reference for the user
    const userRef = db.collection('users').doc(userId);
    let highScore = 0
    // Get the highScore variable from the document
    j = 0;
    o = i;
    i = 0;
    if (o > highScore) {
      userRef.update({ highScore: o })
        .then(() => {
          console.log('High score updated successfully!');
        })
        .catch(error => {
          console.error('Error updating high score:', error);
        });
    }
  
  setShowBravo(false);
  setBalloons([]);
  }
useEffect(() => {
  resetGame();
}, []);

useEffect(() => {
  let intervalId;
  const gameLoop = () => {
    setBalloons((prevBalloons) => {
      const newBalloons = [
        ...prevBalloons,
        { id: Date.now(), popped: false, color: generateColor() },
      ];
      j = j + 1;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd();
      }
      return newBalloons;
    }, [showBravo]);

    console.log(j);

    if (j === 18) {
      resetGame();
      setShowBravo(true);
    }

    if (balloons.some((b) => b.popped)) {
      setCount((count) => count + 1);
    }
  };

  if (!showBravo) {
    intervalId = setInterval(gameLoop, 500);
  }

  return () => clearInterval(intervalId);
}, [showBravo]);

const onPop = (index) => {
  const balloon = balloons[index];
  setCount((count) => count + 1);
  if (balloon.color !== "red") {
    return;
  }
  setBalloons((balloons) => {
    const b = [...balloons];
    b[index].popped = true;
    i += 1;

    return b;
  });
};

const windowHeight = Dimensions.get("window").height;
const balloonSize = 100;
const numColumns = Math.floor(Dimensions.get("window").width / balloonSize);

useEffect(
  () =>
    navigation.addListener("beforeRemove", (e) => {
      if (!hasUnsavedChanges) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => { } },
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    }),
  [navigation, hasUnsavedChanges]
);


return (
  <View style={styles.container}>
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        height: Math.ceil(balloons.length / numColumns) * balloonSize,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y < 0) {
          scrollViewRef.current.scrollToEnd();
        }
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {balloons.map((b, i) => {
          if (!b.popped) {
            return (
              <TouchableOpacity
                key={b.id}
                style={styles.balloonContainer}
                onPress={() => onPop(i)}
              >
                <View
                  style={[styles.balloon, { backgroundColor: b.color }]}
                ></View>
              </TouchableOpacity>
            );
          } else {
            return (
              <View key={b.id} style={styles.balloonContainer}>
                <Text style={styles.poppedText}>popped</Text>
              </View>
            );
          }
        })}
        <TextInput
          value={text}
          placeholder=""
          onChangeText={setText}
        />
      </View>
    </ScrollView>
    <Modal visible={showBravo} animationType="slide">
      <View style={styles.modal}>
        <Text style={styles.bravoText1}>Congratulations!</Text>
        <Text style={styles.bravoText2}>Number of popped balloons: {o}</Text>


        <Button title="Play again" onPress={() => { resetGame(); }} />

      </View>
    </Modal>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 15,
    flex: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  balloonContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  balloon: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: "black",
  },
  poppedText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    flex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bravoText1: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bravoText2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
});