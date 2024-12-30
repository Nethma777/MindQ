import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useCustomContext } from '@/contexts/Context';
import { Alert } from 'react-native';
interface CardProps {
  item: any;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const { increment } = useCustomContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Shuffle the options (correct and incorrect answers)
  const shuffleAnswers = (correctAnswer: string, incorrectAnswers: string[]) => {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  };

  const answers = shuffleAnswers(item.correct_answer, item.incorrect_answers);

  const handleSubmit = () => {
  if (!selectedAnswer) {
    setShowModal(true); // Show modal for no selection
    return;
  }

  if (selectedAnswer === item.correct_answer) {
    increment();
    Alert.alert('Correct!', 'Your answer is correct!');
  } else {
    setShowModal(true); // Show modal for incorrect answer
  }

  // Reset selection for the next question
  setSelectedAnswer(null);
};


  return (
    <View style={styles.card}>
      {/* Display Question */}
      <Text style={styles.title}>{item.question}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>

      {/* Display Options */}
      <View style={styles.options}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === answer && styles.selectedOption,
            ]}
            onPress={() => setSelectedAnswer(answer)}
          >
            <Text style={styles.optionText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Answer</Text>
      </TouchableOpacity>

      {/* Modal for Incorrect Answer */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>❌ You are wrong! Try again! ❌</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0f7fa',  // Very light blue color
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  options: {
    marginVertical: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#cce7ff',
  },
  optionText: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#003366',  // Dark blue color
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});


export default Card;
