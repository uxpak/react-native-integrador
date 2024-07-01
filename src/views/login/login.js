import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage desde el paquete adecuado

const Login = ({ navigation }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const ipAddresses = ['http://192.168.0.105:8080', 'http://192.168.0.6:8080', 'http://192.168.18.40:8080'];
  const maxAttempts = ipAddresses.length;

  const handleLogin = async () => {
    let success = false;
    let attempts = 0;

    while (!success && attempts < maxAttempts) {
      try {
        const response = await fetch(`${ipAddresses[attempts]}/api/auth/loginUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dni, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            await AsyncStorage.setItem('token', data.token); // Guarda el token en AsyncStorage
            Alert.alert('¡Inicio de sesión exitoso!');
            navigation.navigate('Home'); // Navega a la pantalla Home
            success = true;
          } else {
            Alert.alert('Error', 'DNI o contraseña incorrectos');
          }
        } else {
          attempts++;
          if (attempts === maxAttempts) {
            Alert.alert('Error', 'Fallo en la conexión con el servidor');
          }
        }
      } catch (error) {
        attempts++;
        if (attempts === maxAttempts) {
          Alert.alert('Error', 'Algo salió mal. Por favor, intenta de nuevo.');
          console.error('Error en el inicio de sesión:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#FFFFFF"
          onChangeText={text => setDni(text)}
          value={dni}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          color="#40E0D0"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 5,
    color: '#FFFFFF',
  },
});

export default Login;
