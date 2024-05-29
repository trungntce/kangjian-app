import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import { loginScreen } from "../api/API";
import { AuthContext } from "../routers/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";

const LoginDetails = () => {
  const { login, permiss } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [textNotice, setTextNotice] = useState("");

  //Begin Import many languages
  const { t, i18n } = useTranslation();
  //End Import many languages

  const checkValue = () => {
    if (!username.trim() || !password.trim()) {
      return false;
    }
    return true;
  };
  function reset() {
    setUsername("");
    setPassword("");
    setTextNotice("");
  }
  const handleLogin = async () => {
    try {
      if (!checkValue()) {
        setTextNotice(t("lang_login_incorrect"));
        setNotify(true);
        return;
      }
      const res = await loginScreen(username, password);
      if (res) {
        if (res.result.permissions.length != 0 && res.result.token) {
          login(res.result.token, res.result.expiration);
          permiss(res.result.permissions);
        } else {
          setTextNotice(t("lang_login_incorrect"));
          setNotify(true);
          return;
        }
      } else {
        setTextNotice(t("lang_login_incorrect"));
        setNotify(true);
        return;
      }

      setNotify(false);
    } catch (e) {
      setTextNotice(e);
      console.log(e);
    }
  };

  const handleForgotPassword = () => {
    // Xử lý logic quên mật khẩu ở đây
    console.log("Forgot password");
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: hp("100%") }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>{t("lang_login")}</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="user"
                  size={20}
                  color="#724929"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_user_login")}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon
                  name="lock"
                  size={20}
                  color="#724929"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_password_login")}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              {notify && (
                <View>
                  <Text style={styles.notify}>{textNotice}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>{t("lang_login")}</Text>
              </TouchableOpacity>
              <View style={styles.bottomLinks}>
                {/* <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Tạo tài khoản?</Text>
          </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    height: hp("70%"),
  },
  loadingText: {
    marginLeft: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    marginBottom: wp("6%"),
    color: "#724929",
  },
  inputWrapper: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1, // Độ dày của border bottom
    marginBottom: wp("8%"),
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: wp("14%"),
    paddingLeft: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#724929",
    width: "80%",
    height: wp("14%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomLinks: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  linkText: {
    color: "#724929",
    fontSize: wp("4%"),
  },
  notify: {
    color: "red",
    fontSize: wp("3%"),
  },
});

export default LoginDetails;
