import React,{ useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../routers/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Begin Import many languages
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';
//End Import many languages

const Footer = () => {
  
    const navigation = useNavigation();
    
    const { isLoading, isLogin,isMenu,permission,logout } = useContext(AuthContext);
    
    //Begin Import many languages
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  //End Import many languages
    return (
        <View style={styles.footer}>
        <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Home')}>
              <Icon name="home" style={styles.iconFooter} color="white" />
            <Text style={styles.text}>{t("home")}</Text>
                </TouchableOpacity>
        </View>
        {isLogin &&
        <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Transac')}>
              <Icon name="sticky-note" style={styles.iconFooter} color="white" />
            <Text style={styles.text}>{t("lang_transaction_history")}</Text>
                </TouchableOpacity>
        </View>}
        {/* <View style={styles.iconContainer}>
        {isLogin &&
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Deposit')}>
                    <Icon name="credit-card" style={styles.iconFooter} color="white" />
                    <Text style={styles.text}>Nạp tiền</Text>
                </TouchableOpacity>}
        </View> */}
         {isLogin && permission && (permission.includes('ADMIN') || permission.includes('MANAGE') || permission.includes('STAFF')) && (
          <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('ManageMonitor')}>
          <Icon name="bars" style={styles.iconFooter} color="white" />
          <Text style={styles.text}>{t("lang_manage_footer")}</Text>
          </TouchableOpacity>
        )}
        {/* <View style={styles.iconContainer}>
          {isLogin &&
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Pay')}>
                    <Icon name="sticky-note" style={styles.iconFooter} color="white" />
                    <Text style={styles.text}>Dịch vụ</Text>
                </TouchableOpacity>}
        </View> */}
        <View style={styles.iconContainer}>
        {isLogin &&
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('EditCustomer',{userInfo:null})}>
                    <Icon name="user" style={styles.iconFooter} color="white" />
                    <Text style={styles.text}>{t("lang_my_info_footer")}</Text>
                </TouchableOpacity>}
                
        </View>
        {/* {isLogin &&
        <View style={styles.iconContainer}>
        
                <TouchableOpacity style={styles.iconLink} onPress={logOuts}>
                    <Icon name="sign-out" style={styles.iconFooter} color="black" />
                    <Text style={styles.text}>Đăng xuất</Text>
                </TouchableOpacity>
        </View>} */}
        {isLogin ||
        <View style={styles.iconContainer}>
        
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Login')}>
                    <Icon name="sign-in" style={styles.iconFooter} color="white" />
                    <Text style={styles.text}>{t('lang_login')}</Text>
                </TouchableOpacity>
        </View>}
        </View>
    );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#724929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: wp('2.5%'), // Kích thước chữ
    marginTop: 5, // Khoảng cách giữa icon và chữ
  },
  iconLink:{
    alignItems: 'center',
  },
  iconFooter:{
    fontSize:wp('6%')
  }
});

export default Footer;