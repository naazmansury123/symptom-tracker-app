// app/index.jsx
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser } = useAuth();

  // Agar user pehle se logged in hai, toh usko સીધા dashboard par bhej do
  useEffect(() => {
    if (currentUser) {
      router.replace('/(tabs)/dashboard');
    }
  }, [currentUser]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      // Firebase ka login function
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/dashboard'); // Login ke baad dashboard par bhej do
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password');
    }
  };

  // Agar user logged in hai toh kuch na dikhaye (kyunki redirect ho raha hoga)
  if (currentUser) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Symptom Tracker</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create an account" onPress={() => router.push('/signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 40, color: 'gray' },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});