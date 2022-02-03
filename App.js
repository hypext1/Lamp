import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323'

//variables
var currentLocation = 0;
var left = 0;
var right = 0;
var oil = 6;
var cloth = 0;
var protectRunes = 0;
var glowRunes = 0;

export default function App() {
  //hooks
  const [question, setQuestion] = useState(init(0));
  const [o1, setO1] = useState(init(1));
  const [o2, setO2] = useState(init(2));
  const [lampTexture, setLamp] = useState(require('./assets/lamp5.png'));

  //import font
  let [fontsLoaded, error] = useFonts({
    VT323_400Regular
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //random number generator
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //lamp
  function updateLamp(){
    switch(oil){
      case 0: 
        setLamp(require('./assets/lamp0.png'));
        if (currentLocation != 2){
          gameOver();
        }
        break;
      case 1: 
        setLamp(require('./assets/lamp1.png'));
        break;
      case 2: 
        setLamp(require('./assets/lamp2.png'));
        break;
      case 3: 
        setLamp(require('./assets/lamp3.png'));
        break;
      case 4: 
        setLamp(require('./assets/lamp4.png'));
        break;
      case 5: 
        setLamp(require('./assets/lamp5.png'));
        break;
      case 6: 
        setLamp(require('./assets/lamp6.png'));
        break;
      case 7: 
        setLamp(require('./assets/lamp-full.png'));
        break;
      case 8:
        setLamp(require('./assets/lamp-full.png'));
        break;
    }
  }

  //set text at start of game
  function init(part){
    if (part == 0){
      return "You are in a crypt. You have a lamp."
    }
    else if (part == 1){
      return "Continue"
    }
    else if (part == 2){
      return ""
    }
    return "init error"
  }

  //game over
  function gameOver(){
    currentLocation = 99;
    setLamp(require('./assets/lamp0.png'));
    setQuestion("");
    setO1("Game Over");
    setO2("");
  }

  //option selector
  const option1 = () => {
    map(0);
  }
  const option2 = () => {
    map(1);
  }

  //change location
  function map(option){
    var r = getRandomInt(3)

    switch(currentLocation){
      case 0: //intro
        currentLocation = 1;
        fork();
        break;

      case 1: //fork
        if (option == 0){
          if (left == 2){
            light();
          }
          if (left == 3){
            enemy();
          }
          if (left == 4){
            ruins();
          }
        }
        if (option == 1){
          if (right == 2){
            light();
          }
          if (right == 3){
            enemy();
          }
          if (right == 4){
            ruins();
          }
        }
        break;

      case 2: //light
        if (option == 0){
          fork();
        }
        break;

      case 3: //enemy
        if (option == 0){
          if (r == 0){
            enemyGood();
          }
          else if (r == 1){
            if (protectRunes == 0){
              enemyBad();
            }
            else{
              enemyRune();
            }
          }
          else{
            enemyNeutral();
          }
        }
        else if (option == 1){
          fork();
        }
        break;

      case 4: //ruins
        if (option == 0){
          fork();
        }
        break;

      case 5: //enemyGood
        if (option == 0){
          fork();
        }
        break;

      case 6: //enemyNeutral
        if (option == 0){
          fork();
        }
        break;

      case 7: //enemyBad
        if (option == 0){
          gameOver();
        }
        break;
                
      case 8: //dome
        if (option == 0){
          if (getRandomInt(2) == 1){
            protectRunes++;
          }
          else{
            glowRunes++;
          }
          dome2();
        }
        else{
          fork();
        }
        break;

      case 9: //dome2
        if (option == 0){
          switch (r){
            case 0:
              light();
            case 1:
              enemy();
            case 2:
              ruins();
          }
          break;
        }

      case 10: //ruins1
        if (option == 0){
          ruinsReward();
        }
        else{
          fork();
        }
        break;

      case 11: //ruins2
        if (option == 1){
          ruinsReward();
        }
        else{
          fork();
        }
        break;

      case 12: //ruins3
        if (option == 1){
          ruinsReward();
        }
        else{
          fork();
        }
        break;

      case 13: //ruins4
        if (option == 0){
          ruinsReward();
        }
        else{
          fork();
        }
        break;

      case 14: //ruins5
        if (option == 1){
          ruinsReward();
        }
        else{
          fork();
        }
        break;
      
      case 15: //ruins 6
        if (option == 1){
          ruinsReward();
        }
        else{
          fork();
        }
        break;

      case 15: //ruins reward
        if (option == 0){
          fork();
        }
        break;

      case 99: //gameOver
        if (option == 0){
          resetGame();
        }
        break;

      case 100: //win
        if (option == 0){
          resetGame();
        }
    }
    if (getRandomInt(glowRunes+1) == 0){
      oil = oil - 1;
      updateLamp();
    }
    console.log(oil);
  }

  function resetGame(){
    currentLocation = 0;
    left = 0;
    right = 0;
    oil = 6;
    cloth = 0;
    protectRunes = 0;
    map(1);
  }

  //fork scenario
  function fork(){
    if (getRandomInt(7) == 0){
      dome();
    }
    else{
      console.log("fork");
      currentLocation = 1;
      setQuestion("You arrive at a fork.");
  
      //Left
      var r1 = getRandomInt(3)
      if (r1 == 0){
        left = 2;
        setO1("<< Go towards light")
      }
      else if (r1 == 1){
        left = 3;
        setO1("<< Go towards noise")
      }
      else if (r1 == 2){
        left = 4;
        setO1("<< Go towards dark")
      }
  
      //Right
      var r2 = getRandomInt(3)
      if (r2 == 0){
        right = 2;
        setO2("Go towards light >>")
      }
      else if (r2 == 1){
        right = 3;
        setO2("Go towards noise >>")
      }
      else if (r2 == 2){
        right = 4;
        setO2("Go towards dark >>")
      }
    }
    
  }

  //light scenario
  function light(){
    currentLocation = 2;
    console.log("light");
    if (oil < 5){
      oil = oil + 4;
    }
    else{
      oil = 8;
    }
    updateLamp();
    setQuestion("You enter a small room. You found oil for your lamp.");
    setO1("Continue");
    setO2("");
  }

  //enemy scenario
  function enemy(){
    currentLocation = 3;
    console.log("enemy");
    setQuestion("You enter a large room. There is a statue standing near a piece of cloth.");
    setO1("Take cloth");
    setO2("Continue");
  }

  function enemyGood(){
    oil++;
    currentLocation = 5;
    console.log("enemyGood");
    setQuestion("You pick up the cloth. On it is an english word followed by a word in an unknown language.");
    setO1("Continue");
    setO2("");
  }

  function enemyNeutral(){
    currentLocation = 6;
    console.log("enemyNeutral");
    oil = oil - 1;
    setQuestion("As you make your way towards the cloth, the statue lunges at you. You run away, but spill some of the oil in your lamp.");
    setO1("Continue");
    setO2("");
  }

  function enemyBad(){
    oil++;
    currentLocation = 7;
    console.log("enemyBad");
    setQuestion("You make your way to the cloth. When you pick it up, the statue turns you to stone.");
    setO1("Continue");
    setO2("");
  }

  function enemyRune(){
    oil++;
    currentLocation = 6;
    console.log("enemyRune");
    cloth = cloth + 1;
    setQuestion("As you make your way towards the cloth, the statue lunges at you. The rune in your pocket begins to glow, causing it to freeze in place.");
    setO1("Continue");
    setO2("");
  }

  function ruins(){
    if (cloth == 0){
      currentLocation = 4;
      console.log("ruins");
      setQuestion("You enter a hallway full of writing. You cannot read what it says.");
      setO1("Continue");
      setO2("");
    }
    else if (cloth == 1){
      switch(getRandomInt(3)){
        case 0:
          ruins1();
          break;
        case 1:
          ruins2();
          break;
        case 2:
          ruins3();
          break;
      }
    }
    else if (cloth == 2){
      switch(getRandomInt(3)){
        case 0:
          ruins4();
          break;
        case 1:
          ruins5();
          break;
        case 2:
          ruins6();
          break;
      }
    }
  }
  
  function ruins1(){
    currentLocation = 10;
    console.log("ruins1");
    setQuestion("The wall reads /{}\ bird __."); //beast bird fish
    setO1("fish"); //correct
    setO2("sky");
  }

  function ruins2(){
    currentLocation = 11;
    console.log("ruins2");
    setQuestion("The wall reads %() plains __."); //sky plains mountain
    setO1("lion");
    setO2("mountain"); //correct
  }
  
  function ruins3(){
    currentLocation = 12;
    console.log("ruins3");
    setQuestion("The wall reads &]| %() red __."); //blue sky red blood
    setO1("green");
    setO2("blood"); //correct
  }

  function ruins4(){
    currentLocation = 13;
    console.log("ruins4");
    setQuestion("The wall reads beast bird __."); //beast bird fish
    setO1("fish"); //correct
    setO2("sky");
  }

  function ruins5(){
    currentLocation = 14;
    console.log("ruins5");
    setQuestion("The wall reads sky plains __."); //sky plains mountain
    setO1("lion");
    setO2("mountain"); //correct
  }
  
  function ruins6(){
    currentLocation = 15;
    console.log("ruins6");
    setQuestion("The wall reads blue sky red __."); //blue sky red blood
    setO1("green");
    setO2("blood"); //correct
  }

  function ruinsReward(){
    currentLocation = 16;
    console.log("ruinsReward");
    setQuestion("You found something.");
    setO1("Continue");
    setO2("");
  }

  function dome(){
    currentLocation = 8;
    console.log("dome");
    setQuestion("You enter a large, dome-shaped room. In the middle is a stone with a rune inscribed to it.");
    setO1("Take stone");
    setO2("Continue");
  }

  function dome2(){
    currentLocation = 9;
    console.log("dome2");
    setQuestion("As you take the stone, one of the doors closes.");
    setO1("Continue");
    setO2("");
  }

  return (
    <View style={styles.container}>
      <Image source={lampTexture}></Image>
      <Text style={styles.questionText}>{question}</Text>
      <Text></Text>
      <Text style={styles.optionText} onPress={option1}>{o1}</Text>
      <Text style={styles.optionText} onPress={option2}>{o2}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 48,
    fontFamily: "VT323_400Regular"
  },
  optionText: {
    color: '#afa',
    fontSize: 48,
    fontFamily: "VT323_400Regular"
  }
});
