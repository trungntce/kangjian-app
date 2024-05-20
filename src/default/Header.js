import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../routers/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
  const { isLogin, permission } = useContext(AuthContext);
  const navigation = useNavigation();
  
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
        {isLogin &&
          permission &&
          (permission.includes("ADMIN") ||
            permission.includes("MANAGE") ||
            permission.includes("STAFF")) && (
            <TouchableOpacity  onPress={() => navigation.navigate('ManageMonitor')}>
              <Icon name="bars" style={styles.menubar} color="white" />
            </TouchableOpacity>
          )}
      </View>
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
});

export default Header;
