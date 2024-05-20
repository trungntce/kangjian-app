// components/About.js
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import EditCustomerManageDetails from './EditCustomerManageDetails';

const EditCustomerManage= ({route}) => {
  const { userInfo } = route.params;
  return (
    <>
        <Header />
        <View style={styles.container}>
           <EditCustomerManageDetails userInfo={userInfo} />
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

export default EditCustomerManage;