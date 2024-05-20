// App.js
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routers/Router';
import { AuthProvider } from './src/routers/AuthContext'; // Đảm bảo đường dẫn chính xác

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#724929' }}>
        <StatusBar/> 
        <Router />
      </SafeAreaView>
    </AuthProvider>
  );
}