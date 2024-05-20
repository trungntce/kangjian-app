// components/About.js
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import DisplayCustomerDetails from './DisplayCustomerDetails';

const DisplayCustomer= ({route}) => {
  const { phone } = route.params;
  return (
    <>
        <Header />
        <View style={styles.container}>
           <DisplayCustomerDetails phone={phone}/>
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

export default DisplayCustomer;