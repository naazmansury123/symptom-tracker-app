// app/(tabs)/dashboard.jsx

import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase';
// React Native Paper se components import karein
import { ActivityIndicator, Text, Card, Title, Paragraph } from 'react-native-paper';

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'symptoms'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const symptomsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSymptoms(symptomsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={symptoms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>
                {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'Symptom Entry'}
              </Title>
              <Paragraph>Fever: {item.fever || 'N/A'}</Paragraph>
              <Paragraph>Cough: {item.cough || 'N/A'}</Paragraph>
              <Paragraph>Notes: {item.notes || 'No notes.'}</Paragraph>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="headlineSmall">No Symptoms Yet</Text>
            <Text>Click the Add Symptom tab to get started.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginVertical: 8, marginHorizontal: 8 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  }
});