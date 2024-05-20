import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getPersonal, updateUser } from "../../api/API";
import { alertBox } from "../../default/part/Notify";
import { AuthContext } from "../../routers/AuthContext";
import { formatCurrency } from "../../default/part/MoneyFomart";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, toDate } from 'date-fns';

const EditCustomerDetails = () => {
  const { isLoading, isLogin, isMenu, permission, logout } =
    useContext(AuthContext);
  const [idUser, setIdUser] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [cardType, setCardType] = useState("0");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [changeList, setChangeList] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
   
  };

  useEffect(()=>{
      if(permission == null){
        logout();
      }
  },[]);
  useEffect(() => {
    try {
      getPersonals();
    } catch (e) {
      console.log(e);
    }
  }, [changeList]);

  const getPersonals = async () => {
    try {
      setLoading(true);
      const res = await getPersonal();
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
        setAvailableBalance(res.availableBalance);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
      const result = await updateUser(data);
      if (result) {
        alertBox("Hoàn thành chỉnh sửa!");
      } else {
        alertBox("Đã có lỗi xảy ra!");
      }
      setChangeList(!changeList);
    } catch (e) {
      console.log(e);
    }
  };
  const logOuts = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
            contentContainerStyle={{ flexGrow: 1, height: hp("115%") }}
          >
            <View style={styles.headerCus}>
              <View style={styles.infoAcc}>
                <Text style={styles.textDesign}>
                  Xin chào: <Text style={styles.textDesignSub}>{username}</Text>
                </Text>
                <Text style={styles.textDesign}>
                  Số dư của bạn:{" "}
                  <Text style={styles.textDesignSub}>{formatCurrency(availableBalance, 'vi-VN', 'VND')}</Text>
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.containerSignOut}
                  onPress={logOuts}
                >
                  <Icon
                    name="sign-out"
                    style={styles.iconFooter}
                    color="black"
                  />
                  <Text style={styles.btnsignOut}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonhisContainer}
                onPress={() => navigation.navigate('Transac')}
              >
                <Text style={styles.buttonHis}>Lịch sử giao dịch</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.textDesign}>Thông tin của tôi</Text>
            </View>
            <View style={styles.containerContent}>
              <View>
                <View style={styles.inputWrapper}>
                  <Icon name="user" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={[styles.inputWrapper,styles.designReadonly]}>
                  <Icon name="phone" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
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
                    placeholder="abc@gmail.com"
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
                    placeholder="Địa chỉ"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="calendar" style={styles.icon} />
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                   // onChange={onChange}
                    />
                  <TextInput
                    style={styles.input}
                    placeholder="Ngày tháng năm sinh (vd: DD/MM/YYYY)"
                    onChangeText={(text) => setBirthdate(text)}
                    value={birthdate}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="id-card" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Căn cước công dân"
                    onChangeText={(text) => setIdCard(text)}
                    value={idCard}
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={[styles.inputWrapper,styles.designReadonly]}>
                  <Icon name="id-card" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Số thẻ"
                    onChangeText={(text) => setCardNo(text)}
                    value={cardNo}
                    readOnly
                    underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                  />
                </View>
                <View style={[styles.inputWrapper,styles.designReadonly]}>
                  <Icon name="id-card" style={styles.icon} />
                  <View style={styles.cardTypeContainer}>
                    <TouchableOpacity style={styles.cardTypeButton}>
                      <Text style={styles.cardText}>GOLD</Text>
                      {/* Chọn kiểu radiobox theo giá trị của cardType */}
                      {cardType === "1" && (
                        <Icon
                          name="dot-circle-o"
                          style={styles.iconCard}
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
                    <TouchableOpacity style={styles.cardTypeButton}>
                      <Text style={styles.cardText}>PLATIUM</Text>
                      {cardType === "2" && (
                        <Icon
                          name="dot-circle-o"
                          style={styles.iconCard}
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
                    <TouchableOpacity style={styles.cardTypeButton}>
                      <Text style={styles.cardText}>VIP3</Text>
                      {cardType === "3" && (
                        <Icon
                          name="dot-circle-o"
                          style={styles.iconCard}
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
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleUpdate}
                  >
                    <Text style={styles.buttonText}>Sửa thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    height: hp("75%"),
  },
  designReadonly:{
    opacity:wp('0.1%')
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
  infoAcc: {
    flex: 2,
  },
  buttonhisContainer: {
    backgroundColor: "green",
    height: wp("10%"),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: wp("37%"),
    marginLeft: wp("4%"),
  },
  containerSignOut: {
    // width:wp('30%'),
    flexDirection: "row", // Sắp xếp các phần tử con theo chiều ngang
    alignItems: "center",
    backgroundColor: "blue",
    height: wp("10%"),
    borderRadius: 5,
    padding: wp("2%"),
    marginRight: wp("2%"),
    paddingTop: wp("1%"),
  },
  btnsignOut: {
    fontSize: wp("4%"),
    marginRight: wp("2%"),
    color: "white",
  },
  iconFooter: {
    fontSize: wp("6%"),
    marginRight: wp("2%"),
    paddingTop: wp("1%"),
    color: "white",
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
    marginBottom: wp("3%"),
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
});

export default EditCustomerDetails;
