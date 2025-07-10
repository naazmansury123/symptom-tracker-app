// app/index.jsx

import { View, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
// React Native Paper se components import karein
import { TextInput, Button, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.replace('/(tabs)/dashboard');
    }
  }, [currentUser]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login will be handled by useEffect
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Jab tak AuthContext check kar raha hai, loader dikhao
  if (useAuth().loading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>Symptom Tracker</Text>
      <Text variant="titleMedium" style={styles.subtitle}>Welcome back! Please login.</Text>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
      />
      
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        loading={loading}
        disabled={loading}
        icon="login"
      >
        Login
      </Button>
      
      <Button 
        mode="text" 
        onPress={() => router.push('/signup')}
        style={{ marginTop: 10 }}
      >
        Don't have an account? Create one
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FEF7FF' }, // Light theme color
  title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', marginBottom: 32, color: 'gray' },
  input: { marginBottom: 16 },
  button: { paddingVertical: 6, marginTop: 16 },
});