import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,Modal,Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../routers/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from 'react-i18next';
import i18n from "../i18n/i18n";

const Header = () => {
  const { isLogin, permission } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [language,setLanguage] = useState(1);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const languageChange = (idl,li) => {
      setLanguage(idl);
      i18n.changeLanguage(li);
  }
  
  return (
    <View style={styles.header}>
      {/* Phần logo */}
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.iconLink}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/img/kangjian.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      {/* Phần tên công ty */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.whiteText]}>KHANG KIỆN</Text>
        <Text style={[styles.title, styles.whiteText]}>Massage Kangjian</Text>
      </View>
      {/* Phần icon menu */}
      <View style={styles.menuIconContainer}>
      <TouchableOpacity onPress={toggleModal}>
        {language === 1 && (
                      <Image
                      source={require("../assets/img/china.png")}
                      style={styles.logolanguage}
                    />
          )}
           {language === 2 && (
                      <Image
                      source={require("../assets/img/vietnam.png")}
                      style={styles.logolanguage}
                    />
          )}
         </TouchableOpacity>
        
        {/* {isLogin &&
          permission &&
          (permission.includes("ADMIN") ||
            permission.includes("MANAGE") ||
            permission.includes("STAFF")) && (
            <TouchableOpacity  onPress={() => navigation.navigate('ManageMonitor')}>
              
            </TouchableOpacity>
          )} */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.modalBackground} onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => languageChange(1,'zh')}>
              <View style={styles.containerItemL}>
                <Image
                  source={require("../assets/img/china.png")}
                  style={styles.logolanguage}
                />
                <Text style={styles.textlanguage}>Tiếng Trung</Text>
                <Icon name="check" size={wp('5%')} color={language === 1 ? 'green' : 'white'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => languageChange(2,'vi')}>
              <View style={styles.containerItemL}>
                <Image
                  source={require("../assets/img/vietnam.png")}
                  style={styles.logolanguage}
                />
                <Text style={styles.textlanguage}>Tiếng Việt</Text>
                <Icon name="check" size={wp('5%')} color={language === 2 ? 'green' : 'white'} />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: hp("12%"), // Header chiếm 20% chiều cao của màn hình
    backgroundColor: "#724929",
    paddingHorizontal: 10,
  },
  containerItemL:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'center',
      padding:wp('3%')
  },
  textlanguage:{
    fontWeight:'bold'
  },
  language:{
    position:'absolute',
    top:25
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: wp("18%"),
    height: wp("18%"),
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
  },
  whiteText: {
    color: "white", // Màu chữ trắng
  },
  title: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  menuIconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  menuIcon: {
    fontSize: wp("2%"),
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuItem: {
    padding: 10,
  },
  menubar: {
    fontSize: wp("8%"),
  },
  logolanguage:{
    width:wp('13%'),
    height:wp('8%')
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('80%'),
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Header;
