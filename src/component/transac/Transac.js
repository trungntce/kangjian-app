// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../default/Header';
import Footer from '../../default/Footer';
import TransacDetails from './TransacDetails';

const Transac = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
           <TransacDetails />
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

export default Transac;