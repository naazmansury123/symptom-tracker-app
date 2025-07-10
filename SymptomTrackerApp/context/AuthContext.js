// context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// Sahi jagah se 'auth' object import ho raha hai
import { auth } from '../firebase'; 

// Context object banaya
const AuthContext = createContext();

// Ek custom hook banaya taaki humein har baar `useContext(AuthContext)` na likhna pade
export function useAuth() {
  return useContext(AuthContext);
}

// Main Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yeh useEffect sirf ek baar chalega jab component mount hoga
  useEffect(() => {
    // onAuthStateChanged Firebase ka ek listener hai.
    // Jab bhi user login ya logout karega, yeh function apne aap chalega.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Agar user login hai, toh 'user' object milega.
      // Agar user logout hai, toh 'user' null ho jayega.
      setCurrentUser(user);
      // Loading ko false kar do taaki app dikhna shuru ho jaye
      setLoading(false);
    });

    // Yeh ek cleanup function hai. Jab component unmount hoga,
    // toh yeh listener ko hata dega taaki memory leak na ho.
    return unsubscribe;
  }, []);

  // Yeh 'value' object hum poori app mein kahin bhi access kar payenge
  const value = {
    currentUser,
  };

  // Jab tak Firebase check kar raha hai (loading is true), kuch na dikhao.
  // Jaise hi check ho jaye (loading is false), toh children (poori app) ko render karo.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hum AuthProvider ko as a default export bhej rahe hain
// taaki _layout.jsx mein aasani se use kar sakein.
export default AuthProvider;