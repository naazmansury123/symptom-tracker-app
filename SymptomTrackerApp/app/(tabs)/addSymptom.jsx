// app/(tabs)/addSymptom.jsx
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { router } from 'expo-router';

export default function AddSymptom() {
  const [fever, setFever] = useState('');
  const [cough, setCough] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddSymptom = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add symptoms.');
      return;
    }

    if (fever === '' && cough === '' && notes === '') {
        Alert.alert('Error', 'Please enter at least one symptom or note.');
        return;
    }

    try {
      // 'symptoms' collection mein naya document add karein
      await addDoc(collection(db, 'symptoms'), {
        userId: user.uid,
        fever: fever,
        cough: cough,
        notes: notes,
        createdAt: serverTimestamp(), // Firebase server ka current time
      });
      
      Alert.alert('Success', 'Symptom added successfully!');
      // Form clear karein aur dashboard par wapas bhej dein
      setFever('');
      setCough('');
      setNotes('');
      router.push('/(tabs)/dashboard');

    } catch (error) {
      Alert.alert('Error', 'Could not add symptom. Please try again.');
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fever (°F)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 101.4"
        value={fever}
        onChangeText={setFever}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Cough</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Dry, Wet"
        value={cough}
        onChangeText={setCough}
      />
      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="e.g., Feeling tired, headache"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button title="Save Symptom" onPress={handleAddSymptom} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
});