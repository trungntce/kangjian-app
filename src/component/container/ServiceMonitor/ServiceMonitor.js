// components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../default/Header';
import Footer from '../../../default/Footer';
import ServiceMonitorDetails from './ServiceMonitorDetails';

const ServiceMonitor = ({route}) => {
    const { service,info } = route.params;
  return (
    <>
        <Header />
        <View style={styles.container}>
            <ServiceMonitorDetails service={service} info={info} />
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

export default ServiceMonitor;