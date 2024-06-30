import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para validar el inicio de sesión
    if (dni === 'usuario' && password === 'contraseña') {
      Alert.alert('¡Inicio de sesión exitoso!');
      navigation.navigate('Home'); // Navegar a la pantalla Home
    } else {
      Alert.alert('Error', 'DNI o contraseña incorrectos');
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