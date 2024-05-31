import React, { useContext, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { changePass } from "../../../api/API";
import ConfirmBox from "../../../default/part/ConfirmBox";
import { alertBox } from "../../../default/part/Notify";

export default function ChangePassDetails({ userID }) {
  const { isLoading, isLogin, isMenu, permission, logout } =
    useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const checkPer = () => {
    if (permission == "ADMIN" || permission == "MANAGE") {
      return true;
    }
    if (oldPass.trim() == "") {
      return false;
    }
    return true;
  };
  const checkEmpty = () => {
    if (newPass.trim() == "" || repeatPass.trim() == "") {
      return false;
    }
    return true;
  };
  const checkCompare = () => {
    if (newPass != repeatPass) {
      return false;
    }
    return true;
  };
  const checkLength = () => {
    if (newPass.length < 4) {
      return false;
    }
    return true;
  };
  const handleRefesh = () => {
    setOldPass("");
    setNewPass("");
    setRepeatPass("");
  };
  const handleUpdate = async () => {
    const data = {
      idUser: userID,
      currentPassword: oldPass,
      newPassword: newPass,
    };
    const res = await changePass(data);
    if (res) {
      logout();
    }
  };

  const handleConfirm = () => {
    // Xử lý logic khi người dùng xác nhận

    handleUpdate();
    setConfirmVisible(false);
  };

  const handleQuestion = () => {
    // Xử lý logic khi người dùng xác nhận
    if (!checkEmpty()) {
      alertBox(t("lang_complete_input"));
      return;
    }
    if (!checkLength()) {
      alertBox(t("lang_complete_input"));
      return;
    }
    if (!checkCompare()) {
      alertBox(t("lang_complete_input"));
      return;
    }
    if (!checkPer()) {
      alertBox(t("lang_complete_input"));
      return;
    }
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };
  return (
    <View style={[styles.changePassContainer]}>
      <View style={[styles.title]}>
        <Text style={[styles.changePass]}>{t("lang_label_change_pass")}</Text>
      </View>
      <View style={[styles.changePassContent]}>
        {(isLogin &&
          permission &&
          (permission.includes("ADMIN") ||
            permission.includes("MANAGE") ||
            permission.includes("STAFF"))) || (
          <View style={[styles.changePassItem]}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={t("lang_label_pass_moment")}
              onChangeText={(text) => setOldPass(text)}
              value={oldPass}
            />
          </View>
        )}

        <View style={[styles.changePassItem]}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t("lang_label_pass_new")}
            onChangeText={(text) => setNewPass(text)}
            value={newPass}
          />
        </View>
        <View style={[styles.changePassItem]}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t("lang_label_repeat_pass")}
            onChangeText={(text) => setRepeatPass(text)}
            value={repeatPass}
          />
        </View>
        <View style={[styles.button]}>
          <TouchableOpacity
            style={[styles.contaiButton]}
            onPress={handleRefesh}
          >
            <Text style={styles.buttonText}>{t("lang_label_cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contaiButton]}
            onPress={handleQuestion}
          >
            <Text style={styles.buttonText}>{t("lang_label_change")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmBox
        visible={isConfirmVisible}
        message={t("lang_alert_topup_question")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
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
