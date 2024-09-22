import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, StatusBar } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function MazeGame() {
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });

  const walls = [
    { left: 40, top: 10, width: 20, height: 100 },   
    { left: 340, top: 10, width: 20, height: 160 },  
    { left: 190, top: 10, width: 20, height: 70 },   
    { left: 90, top: 110, width: 200, height: 20 },  
    { left: 40, top: 60, width: 300, height: 20 },   
    { left: 240, top: 110, width: 20, height: 200 }, 
    { left: 40, top: 160, width: 150, height: 20 },  
    { left: 170, top: 160, width: 20, height: 60 },  
    { left: 240, top: 210, width: 100, height: 20 }, 
    { left: 40, top: 210, width: 20, height: 150 },  
    { left: 0, top: 360, width: 60, height: 20 },    
    { left: 90, top: 260, width: 200, height: 20 },  
    { left: 290, top: 260, width: 20, height: 200 }, 
    { left: 290, top: 310, width: 100, height: 20 }, 
    { left: 90, top: 360, width: 200, height: 20 },  
    { left: 140, top: 360, width: 20, height: 100 }, 
    { left: 190, top: 360, width: 20, height: 200 }, 
    { left: 240, top: 410, width: 20, height: 150 }, 
    { left: 40, top: 420, width: 20, height: 200 },  
    { left: 240, top: 510, width: 100, height: 20 }, 
    { left: 110, top: 560, width: 100, height: 20 }, 
    { left: 90, top: 610, width: 20, height: 150 },  
    { left: 40, top: 610, width: 300, height: 20 },  
    { left: 40, top: 660, width: 20, height: 100 },  
    { left: 290, top: 660, width: 20, height: 100 }, 
    { left: 290, top: 820, width: 20, height: 100 }, 
    { left: 180, top: 710, width: 20, height: 120 }, 
    { left: 0, top: 740, width: 50, height: 20 },    
    { left: 180, top: 660, width: 120, height: 20 }, 
    { left: 90, top: 820, width: 150, height: 20 },  
    { left: 240, top: 760, width: 150, height: 20 }, 
  ];

  const goal = { left: width - 60, top: height - 40, width: 30, height: 30 };

  useEffect(() => {
    const subscription = Gyroscope.addListener((result) => {
      setGyroData(result);
    });

    return () => subscription.remove();
  }, []);

  const checkCollision = (newX: number, newY: number) => {
    for (let wall of walls) {
      if (
        newX + 20 > wall.left &&
        newX < wall.left + wall.width &&
        newY + 20 > wall.top &&
        newY < wall.top + wall.height
      ) {
        return true;
      }
    }
    return false;
  };

  const checkWin = () => {
    if (
      position.x + 20 > goal.left &&
      position.x < goal.left + goal.width &&
      position.y + 20 > goal.top &&
      position.y < goal.top + goal.height
    ) {
      Alert.alert('Parabéns!', 'Você venceu o jogo!');
      router.back()
    }
  };

  useEffect(() => {
    let newX = position.x + gyroData.y * 5
    let newY = position.y + gyroData.x * 5

    if (newX < 0 || newX + 20 > width || newY < 0 || newY + 20 > height) {
      return;
    }

    if (!checkCollision(newX, newY)) {
      setPosition({ x: newX, y: newY });
    }
  }, [gyroData]);

  useEffect(() => {
    checkWin();
  }, [position]);

  return (
    <View style={styles.container} >
        <StatusBar hidden={true}/>
      {walls.map((wall, index) => (
        <View key={index} style={[styles.wall, wall]} />
      ))}
      <View style={[styles.goal, goal]} />
      <View
        style={[
          styles.ball,
          { left: position.x, top: position.y }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  ball: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  wall: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  goal: {
    position: 'absolute',
    backgroundColor: 'green',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
