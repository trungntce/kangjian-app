import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../routers/AuthContext";
import { useTranslation } from 'react-i18next';


export default function ChangePassDetails() {
  const { isLoading, isLogin, isMenu, permission, logout } =
    useContext(AuthContext);
  const { t, i18n } = useTranslation();
  return (
    <View style={[styles.changePassContainer]}>
      <View style={[styles.title]}>
        <Text style={[styles.changePass]}>{t("lang_label_change_pass")}</Text>
      </View>
      <View style={[styles.changePassContent]}>
        {isLogin &&
          permission &&
          (permission.includes("ADMIN") ||
            permission.includes("MANAGE") ||
            permission.includes("STAFF")) || (
            <View style={[styles.changePassItem]}>
              <Icon name="lock" style={styles.icon} />
              <TextInput style={styles.input} placeholder={t("lang_label_pass_moment")} />
            </View>
          )}

        <View style={[styles.changePassItem]}>
          <Icon name="lock" style={styles.icon} />
          <TextInput style={styles.input} placeholder={t("lang_label_pass_new")} />
        </View>
        <View style={[styles.changePassItem]}>
          <Icon name="lock" style={styles.icon} />
          <TextInput style={styles.input} placeholder={t("lang_label_repeat_pass")} />
        </View>
        <View style={[styles.button]}>
          <TouchableOpacity style={[styles.contaiButton]}>
            <Text style={styles.buttonText}>{t("lang_label_cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contaiButton]}>
            <Text style={styles.buttonText}>{t("lang_label_change")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp("4%"),
    marginBottom: wp("4%"),
  },
  changePass: {
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  changePassItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1, // Độ dày của border bottom
    paddingBottom: wp("2%"),
    marginBottom: wp("10%"),
  },
  changePassContent: {
    marginTop: wp("5%"),
    width: wp("100%"),
    alignItems: "center",
  },
  icon: {
    fontSize: wp("6%"),
    color: "#724929",
  },
  input: {
    width: "80%",
    marginLeft: "5%",
    fontSize: wp("5%"),
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  contaiButton: {
    backgroundColor: "#724929",
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
