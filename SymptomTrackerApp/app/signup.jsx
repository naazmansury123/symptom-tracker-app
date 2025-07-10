// app/signup.jsx

import { View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { router } from 'expo-router';
// React Native Paper se components import karein
import { TextInput, Button, Text } from 'react-native-paper';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created! You can now log in.');
      router.replace('/');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      }
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>Create Account</Text>
      <Text variant="titleMedium" style={styles.subtitle}>Join us to track your health.</Text>
      
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
        placeholder="At least 6 characters"
      />
      
      <Button 
        mode="contained" 
        onPress={handleSignUp} 
        style={styles.button}
        loading={loading}
        disabled={loading}
        icon="account-plus"
      >
        Create Account
      </Button>
      
      <Button 
        mode="text" 
        onPress={() => router.replace('/')}
        style={{ marginTop: 10 }}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FEF7FF' },
  title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', marginBottom: 32, color: 'gray' },
  input: { marginBottom: 16 },
  button: { paddingVertical: 6, marginTop: 16 },
});