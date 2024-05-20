// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../default/Header';
import Footer from '../../default/Footer';
import HistoryTransactionDetails from './HistoryTransactionDetails';


const HistoryTransaction= () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
           <HistoryTransactionDetails />
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

export default HistoryTransaction;