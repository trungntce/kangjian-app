// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../default/Header';
import Footer from '../default/Footer';
import RegisterDetails from './RegisterDetails';

const Register = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
            <RegisterDetails />
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

export default Register;