// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import PayDetails from './PayDetails';

const Pay = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
           <PayDetails />
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

export default Pay;