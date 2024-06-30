import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/appointment')
      .then(response => {
        setCitas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Citas Médicas</Text>
        {citas.map((cita, index) => (
          <View key={index} style={styles.citaContainer}>
            <Text style={styles.citaText}>Fecha: {new Date(cita.date).toLocaleDateString()}</Text>
            <Text style={styles.citaText}>Hora: {cita.time}</Text>
            <Text style={styles.citaText}>Razón: {cita.reason}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  citaContainer: {
    width: Dimensions.get('window').width - 32,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f1f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  citaText: {
    fontSize: 16,
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
