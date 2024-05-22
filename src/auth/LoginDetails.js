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

const LoginDetails = () => {
  const { login, permiss } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [textNotice, setTextNotice] = useState("");

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
      setLoading(true);
      if (!checkValue()) {
        setTextNotice("Tài khoản hoặc mật khẩu không đúng!");
        setNotify(true);
        return;
      }
      const res = await loginScreen(username, password);
      if (res) {
        login(res.result.token, res.result.expiration);
        permiss(res.result.permissions);
      } else {
        setTextNotice("Tài khoản hoặc mật khẩu không đúng!");
        setNotify(true);
        return;
      }
      reset();
      setNotify(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
              <Text style={styles.title}>Đăng nhập</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="user"
                  size={20}
                  color="#724929"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tên đăng nhập"
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
                  placeholder="Mật khẩu"
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
                <Text style={styles.buttonText}>Đăng nhập</Text>
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
