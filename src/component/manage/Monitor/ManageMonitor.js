// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import ManageMonitorDetails from './ManageMonitorDetails';

const ManageMonitor = () => {
  return (
    <>
        <Header />
        <View style={styles.container}>
            <ManageMonitorDetails />
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

export default ManageMonitor;