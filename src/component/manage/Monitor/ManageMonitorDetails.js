import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Alert,KeyboardAvoidingView,ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const ManageMonitorDetails = () => {
   const navigation = useNavigation();
   const { t, i18n } = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1,height:hp('100%')}}>
           <View style={[styles.containerManage]}>
                <View style={[styles.containerItem]}>
                    <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('ListCustomer')}>
                            <Icon name="user" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>{t("lang_user_list")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Register')}>
                            <Icon name="sticky-note" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>{t("lang_user_add")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Deposit')}>
                            <Icon name="dollar" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>{t("lang_topup")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.containerItem]}>
                    <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Pay')}>
                            <Icon name="bars" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>{t("lang_payment")}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink}>
                            <Icon name="bars" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>Quản lý</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemManage]}>
                        <TouchableOpacity style={styles.iconLink}>
                            <Icon name="bars" style={styles.iconFooter} color="black" />
                            <Text style={styles.text}>Quản lý</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                
           </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
    containerManage:{
        padding:wp('10%')
    },
    containerItem:{
        flexDirection: 'row', // Sắp xếp các phần tử con theo chiều ngang
        justifyContent:'center',
        justifyContent:'space-between',
        marginBottom:wp('15%')
    },
    iconLink:{
        justifyContent:'center',
        alignItems:'center'
    },
    iconFooter:{
        fontSize:wp('7%'),
        color:'#724929'
    },
    text:{
        fontSize:wp('3%'),
        color:'#724929',
        fontWeight:'bold'
    }
  
});

export default ManageMonitorDetails;