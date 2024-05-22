import React, { useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../routers/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
const Menu = ({ visible, onClose }) => {
  const { logout,isLogin,isMenu } = useContext(AuthContext);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { t, i18n } = useTranslation();
  const logOuts = async() => {
    try {
       logout();
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.modalViewContainer]}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={[styles.modalView, { width: windowWidth * 0.7, height: windowHeight }]}>
              <TouchableOpacity style={styles.iconImage} onPress={() => navigation.navigate('Home')}>
                  <Image
                  source={require('../assets/img/kangjian.png')} // Thay thế đường dẫn bằng đường dẫn đến logo của bạn
                      style={styles.logo}
                  />
              </TouchableOpacity>
              {Object.keys(isMenu).map((key) => {
                const menu = isMenu[key];
                if (menu.useYn) {
                  return (
                    <TouchableOpacity
                      key={key}
                      style={styles.iconLink}
                      onPress={() => navigation.navigate(menu.menuUrl)}
                    >
                      <Text>{menu.menuName}</Text>
                    </TouchableOpacity>
                  );
                }
                return null;
              })}
              {isLogin &&
              <View>
             
              <TouchableOpacity onPress={() => navigation.navigate('ListCustomer')}>
                    <Text>{t("lang_user_list")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text>Thêm thành viên</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logOuts}>
                <Text>Đăng xuất</Text><Icon name="sign-out" size={24} color="black" />
              </TouchableOpacity>
              </View>
              }
              {!isLogin &&
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>{t('lang_login')}</Text>
              </TouchableOpacity>
              }
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'flex-start', // Đặt vị trí bắt đầu từ góc trái của màn hình
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen với opacity 0.5
  },
  logo:{
    width: wp('30%'),
    height: wp('30%')
  },
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Menu;