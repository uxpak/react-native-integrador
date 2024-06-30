import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const citas = [
    { codigo: '001', doctor: 'Dr. Perez', especialidad: 'Cardiología', fecha: '2024-07-01', hora: '10:00 AM' },
    { codigo: '002', doctor: 'Dra. Gómez', especialidad: 'Dermatología', fecha: '2024-07-01', hora: '11:00 AM' },
    { codigo: '003', doctor: 'Dr. Ruiz', especialidad: 'Pediatría', fecha: '2024-07-01', hora: '12:00 PM' },
    // Añadir más citas según sea necesario
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Citas Médicas</Text>
        {citas.map((cita, index) => (
          <View key={index} style={styles.citaContainer}>
            <Text style={styles.citaText}>Código: {cita.codigo}</Text>
            <Text style={styles.citaText}>Doctor: {cita.doctor}</Text>
            <Text style={styles.citaText}>Especialidad: {cita.especialidad}</Text>
            <Text style={styles.citaText}>Fecha: {cita.fecha}</Text>
            <Text style={styles.citaText}>Hora: {cita.hora}</Text>
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
});

export default HomeScreen;
