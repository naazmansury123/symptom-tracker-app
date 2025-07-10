// app/_layout.jsx
import { Stack } from 'expo-router';
// app/(tabs)/_layout.jsx
import { AuthProvider } from '../context/AuthContext';
import { auth } from '../../firebase'; // Yeh path bhi galat hai

export default function RootLayout() {
  return (
    // AuthProvider humare user login state ko poori app mein manage karega
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Yahan humari screens define hongi */}
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" /> 
      </Stack>
    </AuthProvider>
  );
}