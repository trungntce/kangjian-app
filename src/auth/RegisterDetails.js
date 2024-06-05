import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import { addUser } from "../api/API";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { alertBox } from "../default/part/Notify";
import { getNumberCard, getPromotion, addUserWithCard } from "../api/API";
import {
  formatCurrency,
  processString,
  processStringT,
} from "../default/part/MoneyFomart";
import ConfirmBox from "../default/part/ConfirmBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, toDate } from "date-fns";
import { useTranslation } from "react-i18next";

const RegisterDetails = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [cardType, setCardType] = useState("0");
  const [selectedNumber, setSelectedNumber] = useState("0"); // Thêm state cho số được chọn
  const [showNumberOptions, setShowNumberOptions] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [money, setMoney] = useState("0");
  const [totalMoney, setTotalMoney] = useState("0");
  const [cardKey, setCardKey] = useState(0);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  //const numbers = ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11', '12', '13', '14', '15'];
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setBirthdate(format(currentDate, "yyyy/MM/dd"));
  };
  const showDatepicker = () => {
    setShow(!show);
  };

  const setTextMoney = (text) => {
    const textNumber = isNaN(parseInt(processStringT(text)))
      ? 0
      : parseInt(processStringT(text));
    setMoney(textNumber);
  };
  const toggleNumberOptions = () => {
    setShowNumberOptions(!showNumberOptions);
  };

  const selectNumber = (number, cardType, idCard, minimount) => {
    setCardType(cardType);
    setSelectedNumber(number);
    setMoney(minimount + "");
    setCardKey(idCard);
    toggleNumberOptions();
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setPhoneNumber("");
    setBirthdate("");
    setIdCard("");
  };
  function refeshData() {
    setUsername("");
    setPassword("");
    setPhoneNumber("");
    setBirthdate("");
    setIdCard("");
  }
  useEffect(() => {
    setTotalMoney("0");
  }, [money]);
  useEffect(() => {
    getCard();
  }, []);
  const getCard = async () => {
    try {
      const result = await getNumberCard();
      if (result) {
        setNumbers(result);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const totalCount = async () => {
    try {
      const result = await getPromotion(money);

      if (result) {
        setTotalMoney(result + "");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const check = () => {
    if (!username.trim()) {
      return false;
    }
    if (!password.trim()) {
      return false;
    }
    if (!phoneNumber.trim()) {
      return false;
    }
    if (!email.trim()) {
      return false;
    }
    if (!address.trim()) {
      return false;
    }
    if (!birthdate.trim()) {
      return false;
    }
    if (!idCard.trim()) {
      return false;
    }
    if (parseInt(selectedNumber) == 0) {
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

  const handleRegister = async () => {
    try {
      const data = {
        fullName: username,
        phoneNumber: phoneNumber,
        password: password,
        cccd: idCard,
        birthday: birthdate,
        idCard: cardKey,
        cardType: cardType * 1,
        cardNo: selectedNumber * 1,
        availableBalance: totalMoney * 1,
        amount:money,
        email: email,
        address: address,
      };
      const result = await addUserWithCard(data);
      if (result) {
        alertBox(t("lang_sign_up_success"));
        navigation.navigate("DisplayCustomer", { phone: phoneNumber });
      } else {
        alertBox(t("lang_sign_up_failed"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirm = () => {
    // Xử lý logic khi người dùng xác nhận

    handleRegister();
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

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, height: hp("140%") }}>
          <View style={styles.containerTitle}>
            <Text style={styles.textDesign}>{t("lang_user_add")}</Text>
          </View>
          <View style={styles.containerContent}>
            <View>
              <View style={styles.inputWrapper}>
                <Icon name="user" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_user_fullName")}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="lock" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_password_login")}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="phone" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_user_login")}
                  keyboardType="numeric"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="envelope" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="kangjian@gmail.com"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="map-marker" style={[styles.icon, styles.iconMap]} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_my_address")}
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="calendar" style={styles.icon} />
                <TouchableOpacity onPress={showDatepicker}>
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_my_birthday")}
                    // onChangeText={(text) => setBirthdate(text)}
                    value={birthdate}
                    readOnly
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                  />
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="id-card" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_my_cccd")}
                  keyboardType="numeric"
                  onChangeText={(text) => setIdCard(text)}
                  value={idCard}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="id-card" style={styles.icon} />
                <View style={styles.cardTypeContainer}>
                  <TouchableOpacity style={[
                    styles.cardTypeButton,
                    cardType === "2" ? styles.cardTypeButtonDes : "",
                  ]}>
                    <Text style={[
                      styles.cardText,
                      cardType === "2" ? styles.cardTextDes : "",
                    ]}>GOLD</Text>
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
                  <TouchableOpacity style={[
                    styles.cardTypeButton,
                    cardType === "3" ? styles.cardTypeButtonDes : "",
                  ]}>
                    <Text  style={[
                      styles.cardText,
                      cardType === "3" ? styles.cardTextDes : "",
                    ]}>PLATIUM</Text>
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
                  <TouchableOpacity  style={[
                    styles.cardTypeButton,
                    cardType === "1" ? styles.cardTypeButtonDes : "",
                  ]}>
                    <Text style={[
                      styles.cardText,
                      cardType === "1" ? styles.cardTextDes : "",
                    ]}>VIP</Text>
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
              <View style={styles.toggle}>
                <TouchableOpacity
                  style={styles.toggleinput}
                  onPress={toggleNumberOptions}
                >
                  {/* Icon của chọn số */}
                  <Icon
                    name="credit-card"
                    color="#724929"
                    style={styles.icon}
                  />
                  {/* Giá trị số được chọn */}
                  <Text style={styles.selectedNumber}>{selectedNumber}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <View style={[styles.inputMoney,cardType !== "1" ? styles.designReadonly : "",
                    ]}>
                  <Text style={styles.inputTextMoney}>{t("lang_amount")}</Text>
                  <TextInput
                    style={[styles.inputMoneySub, styles.designMoney]}
                    placeholder="Mini Money"
                    onChangeText={(text) => setTextMoney(text)}
                    keyboardType="numeric"
                    value={money.toLocaleString()}
                    readOnly={cardType !== '1' ? true : false}
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleQuestion}
                >
                  <Text style={styles.buttonText}>{t("lang_complete")}</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </ScrollView>
        <ConfirmBox
          visible={isConfirmVisible}
          message={t("lang_add_member")}
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
          <Pressable
            style={styles.modalBackground}
            onPress={toggleNumberOptions}
          >
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
                            num.minimumAmount
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
    </>
  );
};

const styles = StyleSheet.create({
  headerCus: {
    paddingLeft: wp("3%"),
    paddingTop: wp("4%"),
    flexDirection: "row",
  },
  textDesign: {
    fontWeight: "bold",
    marginBottom: hp("1%"),
    fontSize: wp("4%"),
  },
  designReadonly: {
    opacity: wp("0.1%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  designMoney: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "red",
  },
  textDesignSub: {
    color: "red",
  },
  toggle: {
    zIndex: 2,
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
  inputWrapperCus: {
    width: wp("80%"),
    flexDirection: "row",
    alignItems: "center",

    marginBottom: wp("5%"),
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
    position: "relative",
  },
  toggleinput: {
    width: wp("80%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1, // Độ dày của border bottom
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
    flex: 2,
  },
  inputTextMoney: {
    fontWeight: "bold",
  },
  inputMoneySub: {
    marginLeft: wp("2%"),
    width: wp("35%"),
  },
  input: {
    height: hp("5%"),
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
    backgroundColor: "#724929",
    elevation: 5,
    borderRadius: 5,
    zIndex: 2,
    top: wp("-10%"),
  },
  dropdown: {
    flex: 1,
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
  },
  selectedNumber: {
    fontSize: wp("3%"),
    marginBottom: wp("1%"),
    marginLeft: wp("3%"),
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

export default RegisterDetails;
