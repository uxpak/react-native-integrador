import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          fetchAppointments(token);
        } else {
          Alert.alert('Error', 'No se encontró un token válido. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
        Alert.alert('Error', 'Algo salió mal al obtener el token.');
      }
    };

    getToken();

  }, []);

  const fetchAppointments = async (token) => {
    try {
      const response = await fetch(`http://192.168.0.6:8080/api/appointment/71076855`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos de la cita recibidos:', data);
        if (Array.isArray(data) && data.length > 0) {
          setAppointmentData(data);
        } else {
          Alert.alert('Error', 'La lista de citas está vacía o no es válida.');
        }
      } else {
        console.log('Respuesta del servidor no OK:', response.status);
        Alert.alert('Error', 'No se pudo obtener la lista de citas.');
      }
    } catch (error) {
      console.error('Error al obtener citas:', error);
      Alert.alert('Error', 'Algo salió mal. Por favor, intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Citas:</Text>
      <ScrollView style={styles.scrollView}>
        {appointmentData.length > 0 ? (
          appointmentData.map((appointment, index) => (
            <View key={index} style={styles.appointmentContainer}>
              <Text>Razón: {appointment.reason}</Text>
              <Text>Fecha: {appointment.date}</Text>
              <Text>Hora: {appointment.time}</Text>
              <Text>Doctor: {appointment.doctor}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Cargando citas...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  scrollView: {
    width: '100%',
  },
  appointmentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    maxWidth: 400,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000000',
  },
});

export default Home;
