// components/About.js
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import ChangePassDetails from './ChangePassDetails';

const ChangePass= ({route}) => {
  const { userID } = route.params;
  return (
    <>
        <Header />
        <View style={styles.container}>
            <ChangePassDetails userID={userID} />
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

export default ChangePass;