// components/About.js
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../default/Header';
import Footer from '../../default/Footer';
import EditCustomerDetails from './EditCustomerDetails';

const EditCustomer= ({route}) => {

  return (
    <>
        <Header />
        <View style={styles.container}>
           <EditCustomerDetails />
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

export default EditCustomer;