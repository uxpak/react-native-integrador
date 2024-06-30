import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const HomeScreen = ({ navigation }) => {
  const tableHead = ['Codigo', 'Doctor(a)', 'Especialidad', 'Fecha', 'Hora'];
  const tableData = [
    ['001', 'Dr. Perez', 'Cardiología', '2024-07-01', '10:00 AM'],
    ['002', 'Dra. Gómez', 'Dermatología', '2024-07-01', '11:00 AM'],
    ['003', 'Dr. Ruiz', 'Pediatría', '2024-07-01', '12:00 PM'],
    // Añadir más filas según sea necesario
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Citas Médicas</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
          <Rows data={tableData} textStyle={styles.rowText} />
        </Table>
        
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
    width: Dimensions.get('window').width - 32,
  },
  headText: {
    margin: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowText: {
    margin: 6,
    textAlign: 'center',
    width: Dimensions.get('window').width - 32,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
