import React,{useState} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';

export const alertBox = (message) => {
    Alert.alert(
        'Notification',
        message,
        [
          {
            text: 'OK',
            //onPress: () => console.log('Người dùng đã nhấn OK')
          }
        ]
    );
}

export const confirmBox = (message,hanlderYes) => {
    Alert.alert(
        'Thông báo',
        message,
        [
              {
                text: "Hủy",
              },
              {
                text: "Có",
                onPress: () => hanlderYes
              }
        ]
    );
}