// app/_layout.jsx

import { Stack } from 'expo-router';
import { AuthProvider } from '../../context/AuthContext';
// PaperProvider ko import karein
import { PaperProvider } from 'react-native-paper'; 

export default function RootLayout() {
  return (
    // Poori app ko PaperProvider se wrap karein
    <PaperProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}