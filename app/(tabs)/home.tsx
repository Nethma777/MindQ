import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Card from '../../components/Card'; // Import the Card component
import { useRoute } from '@react-navigation/native';
import { useCustomContext } from '@/contexts/Context';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  const { count } = useCustomContext();

  // Trivia API URL
  const API_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.results); // Fetch trivia questions
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textMain}>Hello, {username}</Text>
        <Text style={styles.textSec}>Learn and Test Your Knowledge</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item} />} // Pass data to Card component
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.floatingButton}>
        <Text style={styles.floatingText}>Total Score : {count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textSec: {
    fontSize: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
  },
  floatingText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default HomePage;
