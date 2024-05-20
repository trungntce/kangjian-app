// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../default/Header';
import Footer from '../../default/Footer';
import HistoryTransacDetails from './HistoryTransacDetails';

const HistoryTransac = ({route}) => {
  const { transacInfo } = route.params;
  return (
    <>
        <Header />
        <View style={styles.container}>
           <HistoryTransacDetails transacInfo={transacInfo} />
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

export default HistoryTransac;