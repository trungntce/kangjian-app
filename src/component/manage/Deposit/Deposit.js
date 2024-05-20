// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import DepositDetails from './DepositDetails';

const Deposit = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
           <DepositDetails />
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

export default Deposit;