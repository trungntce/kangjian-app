import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getCardActive, getPromotion, addDeposit } from "../../../api/API";
import ConfirmBox from "../../../default/part/ConfirmBox";
import { alertBox } from "../../../default/part/Notify";
import {
  formatCurrency,
  processString,
  processStringT,
} from "../../../default/part/MoneyFomart";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../routers/AuthContext";
import { useTranslation } from "react-i18next";

const DepositDetails = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { isLoading, isLogin, isMenu, permission, logout } =
    useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIdUser] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [cardType, setCardType] = useState("0");
  const [numbers, setNumbers] = useState([]);
  const [showNumberOptions, setShowNumberOptions] = useState(false);
  const [money, setMoney] = useState("0");
  const [totalMoney, setTotalMoney] = useState("0");
  const [cardKey, setCardKey] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [fullName, setFullName] = useState("");

  const setTextMoney = (text) => {
    const textNumber = isNaN(parseInt(processStringT(text)))
      ? 0
      : parseInt(processStringT(text));
    setMoney(textNumber);
  };
  const selectNumber = (
    number,
    cardType,
    idCard,
    minimount,
    phone,
    name,
    iduser
  ) => {
    setCardType(cardType);
    setSelectedNumber(number);
    setCardKey(idCard);
    setPhoneNumber(phone);
    setFullName(name);
    setIdUser(iduser);
    toggleNumberOptions();
  };
  const toggleNumberOptions = () => {
    setShowNumberOptions(!showNumberOptions);
  };
  useEffect(() => {
    setTotalMoney("0");
  }, [money]);
  useEffect(() => {
    getCard();
  }, []);
  const getCard = async () => {
    try {
      const result = await getCardActive();
      if (result) {
        setNumbers(result);
        //setPhoneNumber(result.phoneNumber)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const totalCount = async () => {
    try {
      const result = await getPromotion(parseInt(money));
      if (result) {
        setTotalMoney(result + "");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const check = () => {
    if (!idUser) {
      return false;
    }
    if (!phoneNumber.trim()) {
      return false;
    }
    if (parseInt(cardType) == 0) {
      return false;
    }
    if (parseInt(money) == 0) {
      return false;
    }
    if (parseInt(totalMoney) == 0) {
      return false;
    }
    return true;
  };
  const handleUpdate = async () => {
    try {
      // setConfirmVisible(false);
      const data = {
        idUser: idUser,
        phoneNumber: phoneNumber,
        cardType: cardType,
        cardNo: selectedNumber,
        idCard: cardKey,
        amount: money * 1,
        totalAmount: totalMoney * 1,
      };
      const result = await addDeposit(data);
      if (result) {
        //console.log(result)
        alertBox(t("lang_complete"));
      } else {
        alertBox(t("lang_alert_error"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirm = () => {
    // Xử lý logic khi người dùng xác nhận

    handleUpdate();
    setConfirmVisible(false);
  };

  const handleQuestion = () => {
    // Xử lý logic khi người dùng xác nhận
    if (!check()) {
      alertBox(t("lang_complete_input"));
      return;
    }
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    // Xử lý logic khi người dùng hủy
    console.log("Cancelled");
    setConfirmVisible(false);
  };

  const handleReset = () => {
    //setNumbers([]);
    setIdUser(false);
    setSelectedNumber("");
    setFullName("");
    setPhoneNumber("");
    setCardType("0");
    setMoney("0");
    setTotalMoney(0);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: hp("100%") }}>
        <View style={styles.containerTitle}>
          <Text style={styles.textDesign}>{t("lang_topup")}</Text>
        </View>
        {isLogin && permission && permission.includes("ADMIN") && (
          <View style={styles.containerSetup}>
            <TouchableOpacity
              style={styles.setupuudai}
              onPress={() => navigation.navigate("Promotion")}
            >
              <Text style={styles.buttonText}>{t("lang_offer_settings")}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.containerContent}>
          <View>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={toggleNumberOptions}
            >
              {/* Icon của chọn số */}
              <Icon name="credit-card" color="#724929" style={styles.icon} />
              {/* Giá trị số được chọn */}
              <Text style={styles.selectedNumber}>{selectedNumber}</Text>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <Icon name="user" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={t("lang_user_fullName")}
                readOnly
                value={fullName}
                underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="phone" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={t("lang_user_login")}
                readOnly
                value={phoneNumber}
                underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="id-card" style={styles.icon} />
              <View style={styles.cardTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.cardTypeButton,
                    cardType === "2" ? styles.cardTypeButtonDes : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      cardType === "2" ? styles.cardTextDes : "",
                    ]}
                  >
                    GOLD
                  </Text>
                  {/* Chọn kiểu radiobox theo giá trị của cardType */}
                  {cardType === "2" && (
                    <Icon
                      name="dot-circle-o"
                      style={[styles.iconCard, styles.iconCardChoose]}
                      color="#724929"
                    />
                  )}
                  {cardType !== "2" && (
                    <Icon
                      name="circle-o"
                      style={styles.iconCard}
                      color="#724929"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.cardTypeButton,
                    cardType === "3" ? styles.cardTypeButtonDes : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      cardType === "3" ? styles.cardTextDes : "",
                    ]}
                  >
                    PLATIUM
                  </Text>
                  {cardType === "3" && (
                    <Icon
                      name="dot-circle-o"
                      style={[styles.iconCard, styles.iconCardChoose]}
                      color="#724929"
                    />
                  )}
                  {cardType !== "3" && (
                    <Icon
                      name="circle-o"
                      style={styles.iconCard}
                      color="#724929"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.cardTypeButton,
                    cardType === "1" ? styles.cardTypeButtonDes : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      cardType === "1" ? styles.cardTextDes : "",
                    ]}
                  >
                    VIP
                  </Text>
                  {cardType === "1" && (
                    <Icon
                      name="dot-circle-o"
                      style={[styles.iconCard, styles.iconCardChoose]}
                      color="#724929"
                    />
                  )}
                  {cardType !== "1" && (
                    <Icon
                      name="circle-o"
                      style={styles.iconCard}
                      color="#724929"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputMoney}>
                <Text style={styles.inputTextMoney}>{t("lang_amount")}</Text>
                <TextInput
                  style={[styles.inputMoneySub, styles.designMoney]}
                  placeholder="Mini Money"
                  onChangeText={(text) => setTextMoney(text)}
                  keyboardType="numeric"
                  value={money.toLocaleString()}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
            </View>
            <View style={styles.inputWrapperCus}>
              <View style={styles.totalcontainer}>
                <TouchableOpacity
                  style={styles.buttonTotal}
                  onPress={totalCount}
                >
                  <Text style={styles.buttonTextTotal}>
                    {t("lang_get_offer")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTextMoney}>
                {t("lang_total_amount")}
              </Text>
              <TextInput
                style={[styles.input, styles.designMoney]}
                placeholder="############"
                value={formatCurrency(totalMoney, "vi-VN", "VND")}
                readOnly
                underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonReset]}
                onPress={handleReset}
              >
                <Text style={[styles.buttonText, styles.resetText]}>
                  {t("lang_reset")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleQuestion}>
                <Text style={styles.buttonText}>{t("lang_complete")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <ConfirmBox
        visible={isConfirmVisible}
        message={t("lang_alert_topup_question")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNumberOptions}
        onRequestClose={toggleNumberOptions}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.modalBackground} onPress={toggleNumberOptions}>
          <View style={styles.modalContainer}>
            <ScrollView style={[styles.scrollcontainer]}>
              {Object.keys(numbers).map((key) => {
                const num = numbers[key];
                if (num.useYn) {
                  return (
                    <TouchableOpacity
                      key={num.idCard}
                      style={styles.dropdownItem}
                      onPress={() =>
                        selectNumber(
                          num.cardNo,
                          num.cardType,
                          num.idCard,
                          num.availableBalance,
                          num.phoneNumber,
                          num.fullName,
                          num.idUser
                        )
                      }
                    >
                      <Text style={styles.optionText}>{num.cardNo}</Text>
                    </TouchableOpacity>
                  );
                }
                return null;
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  containerSetup: {
    flexDirection: "row",
    justifyContent: "flex-end", // Căn sang bên phải
    paddingRight: 40,
    paddingTop: 10,
  },
  headerCus: {
    paddingLeft: wp("3%"),
    paddingTop: wp("4%"),
    flexDirection: "row",
    borderWidth: "1",
  },
  textDesign: {
    fontWeight: "bold",
    marginBottom: hp("1%"),
    fontSize: wp("4%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDesignSub: {
    color: "red",
  },
  designMoney: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "red",
  },
  buttonReset: {
    backgroundColor: "silver",
  },
  historyTransac: {
    flexDirection: "row", // Sắp xếp các phần tử con theo chiều ngang
    justifyContent: "center",
  },
  resetText: {
    color: "black",
  },
  buttonhisContainer: {
    backgroundColor: "green",
    height: wp("10%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  buttonHis: {
    color: "white",
    fontWeight: "bold",
    padding: "20",
  },
  containerTitle: {
    paddingTop: wp("3%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  buttoninfoContainer: {
    width: wp("25%"),
    marginLeft: wp("2%"),
  },
  containerContent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonTotal: {
    backgroundColor: "green",
    height: wp("10%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("1%"),
  },
  buttonTextTotal: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("3%"),
  },
  totalcontainer: {
    flex: 1,
  },
  inputWrapper: {
    width: wp("80%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1, // Độ dày của border bottom
    marginBottom: wp("5%"),
  },
  inputWrapperCus: {
    width: wp("80%"),
    flexDirection: "row",
    alignItems: "center",

    marginBottom: wp("5%"),
  },
  icon: {
    marginRight: wp("2%"),
    color: "#724929",
    fontSize: wp("5%"),
  },
  iconMap: {
    marginRight: wp("4%"),
  },
  inputMoney: {
    flexDirection: "row",
  },
  inputTextMoney: {
    fontWeight: "bold",
  },
  inputMoneySub: {
    marginLeft: wp("2%"),
    width: "100%",
  },
  input: {
    height: hp("4%"),
    paddingLeft: 10,
    flex: 1,
    fontSize: wp("3%"),
    color: "black",
  },
  cardTypeContainer: {
    flexDirection: "row",
    marginLeft: wp("2%"),
    marginBottom: wp("2%"),
  },
  cardTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#724929",
    borderRadius: 5,
    marginRight: wp("2%"),
  },
  cardTypeText: {
    color: "#724929",
    marginLeft: 5,
    marginRight: 5,
  },
  cardText: {
    marginRight: 5,
    fontSize: wp("3%"),
  },
  cardIcon: {
    fontSize: wp("4%"),
  },
  button: {
    backgroundColor: "#724929",
    width: "35%",
    height: wp("12%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("1%"),
    marginTop: wp("1%"),
  },
  setupuudai: {
    backgroundColor: "green",
    width: "35%",
    height: wp("12%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("1%"),
    marginBottom: wp("2%"),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("3%"),
  },
  selected: {
    backgroundColor: "#724929",
  },
  dropdownContainer: {
    position: "absolute",
    width: "100%",
    // Đặt chiều cao tối đa cho dropdown
    //height:hp('100%'),
    backgroundColor: "#724929",
    elevation: 5,
    borderRadius: 5,
    top: "6%",
    zIndex: 2,
  },
  dropdown: {
    flex: 1,
    height: hp("50%"),
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    color: "red",
  },
  optionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("3%"),
  },
  selectedNumber: {
    fontSize: wp("3%"),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: wp("80%"),
    backgroundColor: "#724929",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: wp("4%"),
    marginBottom: 10,
  },
  scrollcontainer: {
    height: wp("80%"),
  },
  cardTypeButtonDes: {
    backgroundColor: "#724929",
  },
  cardTextDes: {
    color: "white",
  },
  iconCardChoose: {
    color: "white",
  },
});

export default DepositDetails;
