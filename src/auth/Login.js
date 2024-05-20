// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../default/Header';
import Footer from '../default/Footer';
import LoginDetails from './LoginDetails';

const Login = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
            <LoginDetails />
        </View>
        <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;