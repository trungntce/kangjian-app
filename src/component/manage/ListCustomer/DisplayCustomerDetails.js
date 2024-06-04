import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getPersonal, getUserByPhone } from "../../../api/API";
import { alertBox } from "../../../default/part/Notify";
import { formatCurrency } from "../../../default/part/MoneyFomart";
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { editUser } from "../../../api/API";
import ConfirmBox from "../../../default/part/ConfirmBox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, toDate } from 'date-fns';

const DisplayCustomerDetails = ({ phone }) => {
  const [idUser, setIdUser] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [cardType, setCardType] = useState("0");
  //const [selectedNumber, setSelectedNumber] = useState('1'); // Thêm state cho số được chọn
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [changeList, setChangeList] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  // const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setBirthdate(format(currentDate, 'yyyy/MM/dd'));
  };
  const showDatepicker = () => {
    setShow(!show);
  };
  useEffect(() => {
    try {
      if (phone) {
        getPersonals();
      }
    } catch (e) {
      console.log(e);
    }
  }, [changeList]);

  const getPersonals = async () => {
    try {
      setLoading(true);
      const res = await getUserByPhone(phone);
      if (res) {
        setIdUser(res.idUser);
        setUsername(res.fullName);
        setPassword(res.password);
        setPhoneNumber(res.phoneNumber);
        setBirthdate(res.birthday);
        setAddress(res.address);
        setEmail(res.email);
        setCardNo(res.cardNo + "");
        setCardType(res.cardType + "");
        setIdCard(res.cccd);
        setAvailableBalance(res.availableBalance ? res.availableBalance:"");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const changeInfo = () => {
    setConfirmVisible(true);
  }
  const handleConfirm = () => {
    handleUpdate();
    setConfirmVisible(false);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };
  const handleUpdate = async () => {
    try {
      const data = {
        idUser: idUser,
        fullName: username,
        cccd: idCard,
        email: email,
        address: address,
        birthday: birthdate,
        phoneNumber: phoneNumber,
      };
      const result = await editUser(data);
      if (result) {
        
        alertBox(t('lang_alert_edited'));
      } else {
        alertBox(t('lang_alert_error'));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // const handleUpdate = async() => {
  //   try{
  //     const data = {
  //         idUser:idUser,
  //         fullName:username,
  //         cccd:idCard,
  //         email:email,
  //         address:address,
  //         birthday:birthdate,
  //         phoneNumber:phoneNumber
  //     };
  //     const result = await updateUser(data);
  //     if(result){
  //       alertBox("Hoàn thành chỉnh sửa!")
  //     }else{
  //       alertBox("Đã có lỗi xảy ra!")
  //     }
  //     setChangeList(!changeList)
  //   }catch(e){
  //     console.log(e);
  //   }
  // };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>{t("lang_loading")}</Text>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <ScrollView style={styles.containerScroll}>
            <View style={styles.containerTitle}>
              <Text style={styles.textDesign}>{t("lang_user_info")}</Text>
            </View>
            <View style={styles.containerContent}>
              <View>
                <View style={[styles.inputWrapper,styles.designReadonly]}>
                  <Icon name="user" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_user_fullName")}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    readOnly
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={[styles.inputWrapper,styles.designReadonly]}>
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
                  <Icon
                    name="map-marker"
                    style={[styles.icon, styles.iconMap]}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_my_address")}
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View><TouchableOpacity  onPress={() => showDatepicker()}>
                <View style={styles.inputWrapper}>
                  
                  <Icon name="calendar" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_my_birthday")}
                    //onChangeText={(text) => setBirthdate(text)}
                    value={birthdate}
                    readOnly
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View></TouchableOpacity>
                {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onChange}
                    />
                )}
                <View style={styles.inputWrapper}>
                  <Icon name="id-card" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_my_cccd")}
                    onChangeText={(text) => setIdCard(text)}
                    value={idCard}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="id-card" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_card_no")}
                    onChangeText={(text) => setCardNo(text)}
                    value={cardNo}
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
                  <Text>Số dư:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("lang_card_no")}
                    value={formatCurrency(availableBalance, "vi-VN", "VND")}
                    readOnly
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={changeInfo}
                  >
                    <Text style={styles.buttonText}>{t("lang_edit_information")}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.containerChangePass}>
                  <TouchableOpacity
                   onPress={() => navigation.navigate("ChangePass",{userID:idUser,page:true})}
                   style={[styles.contaiChangePass]}
                  >
                    <Text style={[styles.textChangePass]}>{t("lang_label_change_pass")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <ConfirmBox
                visible={isConfirmVisible}
                message={t("lang_alert_edit_question")}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    height: hp("80%"),
  },
  loadingContainer: {
    justifyContent: "center",
    height: hp("70%"),
  },
  loadingText: {
    marginLeft: 10,
    textAlign: "center",
  },
  headerCus: {
    paddingLeft: wp("3%"),
    paddingTop: wp("4%"),
    flexDirection: "row",
  },
  textDesign: {
    fontWeight: "bold",
    marginBottom: hp("1%"),
    fontSize: wp("3%"),
  },
  textDesignSub: {
    color: "red",
  },
  historyTransac: {
    flexDirection: "row", // Sắp xếp các phần tử con theo chiều ngang
    justifyContent: "flex-end",
    paddingRight: wp("3%"),
    flex: 2,
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
    fontSize: wp("3%"),
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
  inputWrapper: {
    width: wp("80%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1, // Độ dày của border bottom
    marginBottom: wp("4%"),
  },
  icon: {
    marginRight: wp("2%"),
    color: "#724929",
    fontSize: wp("5%"),
  },
  iconMap: {
    marginRight: wp("4%"),
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
    width: "100%",
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
    fontSize: wp("4%"),
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
  containerChangePass: {
    alignItems: "center",
    marginTop: wp("4%"),
  },
  textChangePass: {
    color: "blue",
    fontWeight: "bold",
  },
  designReadonly:{
    opacity:wp('0.1%')
  },
});

export default DisplayCustomerDetails;
