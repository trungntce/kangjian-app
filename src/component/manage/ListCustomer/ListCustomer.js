// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import ListCustomerDetails from './ListCustomerDetails';

const ListCustomer = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
           <ListCustomerDetails />
        </View>
        <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ListCustomer;