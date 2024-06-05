import React, { useState, useEffect } from "react";
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
import {
  getCardActive,
  getPromotion,
  getService,
  updatePayment,
} from "../../../api/API";
import ConfirmBox from "../../../default/part/ConfirmBox";
import { alertBox } from "../../../default/part/Notify";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../../../default/part/MoneyFomart";
import { useTranslation } from "react-i18next";
const PayDetails = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [cardType, setCardType] = useState("0");
  const [numbers, setNumbers] = useState([]);
  const [showNumberOptions, setShowNumberOptions] = useState(false);
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const [money, setMoney] = useState("0");
  const [totalMoney, setTotalMoney] = useState("0");
  const [cardKey, setCardKey] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [listService, setListService] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [serviceMoney, setServiceMoney] = useState("");
  const [idPricing, setIdPricing] = useState("");
  const [idRef, setIdRef] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idCard, setIdCard] = useState("");
  const { t, i18n } = useTranslation();

  const selectService = (nameS, timeS, moneyS, idP, idR) => {
    setServiceName(nameS);
    setServiceTime(timeS + "");
    setServiceMoney(moneyS + "");
    setIdRef(idR);
    setIdPricing(idP);
    toggleServiceOptions();
  };
  const selectNumber = (
    number,
    cardType,
    idCard,
    money,
    fullname,
    phoneNumber,
    idUser
  ) => {
    setCardType(cardType+"");
    setSelectedNumber(number);
    setFullName(fullname);
    setPhoneNumber(phoneNumber);
    setAvailableBalance(money + "");
    setIdCard(idCard);
    setIdUser(idUser);
    toggleNumberOptions();
  };
  const toggleNumberOptions = () => {
    setShowNumberOptions(!showNumberOptions);
  };
  const toggleServiceOptions = () => {
    setShowServiceOptions(!showServiceOptions);
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updatePay = async () => {
    try {
      if (!check()) {
        alertBox(t("lang_complete_input"));
        return;
      }
      if (!checkMoney()) {
        alertBox(t("lang_log_money"));
        return;
      }

      setConfirmVisible(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async () => {
    try {
      // setConfirmVisible(false);
      const data = {
        idUser: idUser,
        phoneNumber: phoneNumber,
        cardType: cardType,
        cardNo: selectedNumber,
        idCard: idCard,
        amount: serviceMoney,
        totalAmount: serviceMoney,
        idPricing: idPricing,
        idRef: idRef,
      };
      const result = await updatePayment(data);
      if (result) {
        alertBox(t("lang_complete"));
        navigation.navigate("Transac");
      } else {
        alertBox(t("lang_alert_error"));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getListService();
  }, []);
  const getListService = async () => {
    try {
      const result = await getService();
      if (result) {
        setListService(result);
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

  const handleCancel = () => {
    // Xử lý logic khi người dùng hủy
    console.log("Cancelled");
    setConfirmVisible(false);
  };
  const check = () => {
    if (!idUser) {
      return false;
    }
    if (!phoneNumber.trim()) {
      return false;
    }
    if (parseInt(serviceMoney) == 0) {
      return false;
    }
    

    return true;
  };
  const checkMoney = () => {
    if(parseInt(serviceMoney) > parseInt(availableBalance)){
      return false;
    }
    return true;
  }
  const handleReset = () => {
    setServiceName("");
    setServiceTime("");
    setServiceMoney("");
    setSelectedNumber("");
    setIdCard("");
    setFullName("");
    setPhoneNumber("");
    setCardType("");
    setIdPricing("");
    setIdRef("");
    setAvailableBalance(0);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, height: hp("100%") }}>
          <View style={styles.containerTitle}>
            <Text style={styles.textDesign}>{t("lang_payment")}</Text>
          </View>

          <View style={styles.containerContent}>
            <View>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={toggleServiceOptions}
              >
                {/* Icon của chọn số */}
                <Icon name="credit-card" color="#724929" style={styles.icon} />
                {/* Giá trị số được chọn */}
                <Text style={styles.selectedNumber}>{serviceName}</Text>
              </TouchableOpacity>

              <View style={styles.inputWrapper}>
                <Icon name="user" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={serviceTime}
                  readOnly
                  placeholder={t("lang_number_of_minutes")}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="dollar" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={formatCurrency(serviceMoney, "vi-VN", "VND")}
                  readOnly
                  placeholder={t("lang_amount")}
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
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
                  value={fullName}
                  readOnly
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="phone" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("lang_user_login")}
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  readOnly
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
                <Text style={styles.inputTextMoney}>
                  {t("lang_account_balance")}
                </Text>
                <TextInput
                  style={[styles.input, styles.inputMoneys]}
                  placeholder="############"
                  value={formatCurrency(availableBalance, "vi-VN", "VND")}
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
                <TouchableOpacity style={styles.button} onPress={updatePay}>
                  <Text style={styles.buttonText}>{t("lang_complete")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ConfirmBox
        visible={isConfirmVisible}
        message={t("lang_alert_pay_question")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showServiceOptions}
        onRequestClose={toggleServiceOptions}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={toggleServiceOptions}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={[styles.scrollcontainer]}>
              {Object.keys(listService).map((key, index) => {
                const list = listService[key];
                if (list.useYn) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() =>
                        selectService(
                          list.serviceName,
                          list.duration,
                          list.totalAmount,
                          list.idPricing,
                          list.idService
                        )
                      }
                    >
                      <Text style={styles.optionText}>
                        {list.serviceName} -- Time:{list.duration}p
                      </Text>
                    </TouchableOpacity>
                  );
                }
                return null;
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
                          num.fullName,
                          num.phoneNumber,
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
    </>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    height: hp("75%"),
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
    marginBottom: wp("7%"),
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
  inputMoneys: {
    color: "red",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  inputTextMoney: {
    fontWeight: "bold",
  },
  inputMoneySub: {
    marginLeft: wp("2%"),
    width: wp("30%"),
  },
  input: {
    height: hp("6%"),
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
  cardTypeButtonDes: {
    backgroundColor: "#724929",
  },
  cardTextDes: {
    color: "white",
  },
  iconCardChoose: {
    color: "white",
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
    top: "6%",
    zIndex: 2,
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
});

export default PayDetails;
