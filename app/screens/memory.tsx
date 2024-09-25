import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';
import { petService } from '../database/petsService';
import { useLocalSearchParams } from 'expo-router';

interface Card {
  id: number;
  value: string;
}

const cardsArray: Card[] = [
  { id: 1, value: '🍎' },
  { id: 2, value: '🍌' },
  { id: 3, value: '🍇' },
  { id: 4, value: '🍓' },
  { id: 5, value: '🍉' },
  { id: 6, value: '🍒' },
  { id: 7, value: '🍐' },
  { id: 8, value: '🍊' },
  { id: 9, value: '🍑' },
  { id: 10, value: '🥥' },
  { id: 11, value: '🥑' },
  { id: 12, value: '🥝' },
  { id: 13, value: '🍋‍🟩' },
  { id: 14, value: '🍋' }
];

const shuffleArray = (array: Card[]): Card[] => {
  let shuffledArray = [...array, ...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(shuffleArray(cardsArray));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [pet, setPet] = useState<any>([])
  const petServ = petService();
  const params = useLocalSearchParams()
  
  const buscarPet = async () => {
    const res = await (await petServ).getPetsById(Number(params.id))
    await setPet(res)
  }
  
  const aumentarDiversão = async () => {
    const novaDiversao = pet.diversao + 5;
    (await petServ).setDiversao(novaDiversao, Number(params.id))
  }
  
  useEffect(() => {
    buscarPet()
  }, [])
  
  const handleCardPress = (index: number) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };
  
  
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].value === cards[second].value) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true);
      aumentarDiversão()
    }
  }, [matchedCards]);

  const resetGame = () => {
    setCards(shuffleArray(cardsArray));
    setSelectedCards([]);
    setMatchedCards([]);
    setGameOver(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(index)}
            style={styles.card}
            disabled={matchedCards.includes(index) || selectedCards.includes(index)}
          >
            <Text style={styles.cardText}>
              {selectedCards.includes(index) || matchedCards.includes(index)
                ? card.value
                : '❓'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameOver && (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverText}>Você venceu!</Text>
          <Button title="Reiniciar" onPress={resetGame} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 32,
  },
  gameOver: {
    marginTop: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'green',
  },
});

export default MemoryGame;