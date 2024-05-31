import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ thư viện
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { getListPromotion, updatePromotion } from "../../../api/API";
import ConfirmBox from "../../../default/part/ConfirmBox";
import { formatCurrency } from "../../../default/part/MoneyFomart";
import { alertBox } from "../../../default/part/Notify";
import { useTranslation } from "react-i18next";

const PromotionDetails = () => {
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [allmoney, setAllMoney] = useState(0);
  const [promotionmoney, setPromotionMoney] = useState(0);
  const [idTopup, setIdTopUp] = useState(0);
  const [status, setStatus] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    try {
      getListPM();
    } catch (e) {
      console.log(e);
    }
  }, [status]);

  const getListPM = async () => {
    try {
      setLoading(true);
      const res = await getListPromotion();
      if (res) {
        setListItem(res);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const check = () => {
    if (
      parseInt(allmoney) < 10000 ||
      parseInt(allmoney) > 1000000000 ||
      parseInt(promotionmoney) < 10000 ||
      parseInt(promotionmoney) > 1000000000
    ) {
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    try {
      // setConfirmVisible(false);

      const data = {
        idTopupPromotion: idTopup,
        topupAmount: allmoney,
        promotionalAmount: promotionmoney,
      };
      const result = await updatePromotion(data);
      if (result) {
        toggleModal();
        setStatus(!status);
        alertBox("Chỉnh sửa thành công!");
      } else {
        alertBox("Đã có lỗi xảy ra!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const infoPromotion = (data) => {
    setIdTopUp(data.idTopupPromotion);
    setAllMoney(data.topupAmount + "");
    setPromotionMoney(data.promotionalAmount + "");
    toggleModal();
  };
  const handleQuestion = () => {
    if (!check()) {
      alertBox("Giá trị phải nằm trong khoảng 10.000 - 1.000.000.000!");
      return;
    }
    setConfirmVisible(true);
  };
  const handleConfirm = () => {
    // Xử lý logic khi người dùng xác nhận

    handleUpdate();
    setConfirmVisible(false);
  };

  const handleCancel = () => {
    // Xử lý logic khi người dùng hủy

    setConfirmVisible(false);
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>{t("lang_loading")}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCustomer}>Danh sách ưu đãi nạp tiền</Text>
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Thêm ưu đãi</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            {listItem.map((item, index) => (
              <View key={index} style={styles.container}>
                {/* Phần 1: Hiển thị tên và số điện thoại */}
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>
                    {formatCurrency(item.topupAmount, "vi-VN", "VND")}
                  </Text>
                  <Text style={styles.phone}>
                    Ưu đãi:
                    {formatCurrency(item.promotionalAmount, "vi-VN", "VND")}
                  </Text>
                </View>
                {/* Phần 2: Hiển thị icon sửa và xóa */}
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Icon
                      name="edit"
                      style={[styles.icon, styles.iconblue]}
                      onPress={() => infoPromotion(item)}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => remove(item.p)}>
                            <Icon name="trash" style={styles.icon} />
                        </TouchableOpacity> */}
                </View>
              </View>
            ))}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <Pressable style={styles.modalBackground} onPress={toggleModal}>
              <View style={styles.modalContainer}>
                <View>
                  <View style={styles.modalItem}>
                    <Text style={styles.textmodalItem}>Số tiền</Text>
                    <TextInput
                      placeholder="########"
                      keyboardType="numeric"
                      value={allmoney}
                      onChangeText={(text) => setAllMoney(text)}
                      style={[styles.inputwrap]}
                    />
                  </View>
                  <View style={styles.modalItem}>
                    <Text style={styles.textmodalItem}>Ưu đãi</Text>
                    <TextInput
                      placeholder="########"
                      keyboardType="numeric"
                      value={promotionmoney}
                      onChangeText={(text) => setPromotionMoney(text)}
                      style={[styles.inputwrap]}
                    />
                  </View>
                  <View style={styles.modalIte}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleQuestion}
                    >
                      <Text style={styles.buttonText}>{t("lang_complete")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Pressable>
          </Modal>
          <ConfirmBox
            visible={isConfirmVisible}
            message="Bạn có muốn chỉnh sửa?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: hp("70%"),
  },
  modalIte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: wp("4%"),
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
    padding: wp("4%"),
  },
  inputwrap: {
    borderBottomColor: "#724929", // Màu của border bottom
    borderBottomWidth: 1,
    width: "70%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: wp("3%"),
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
  textmodalItem: {
    fontSize: wp("4%"),
    marginRight: wp("3%"),
    fontWeight: "bold",
  },
  titleCustomer: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#724929",
  },
  container: {
    flexDirection: "row", // Các phần tử nằm cùng một hàng
    alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  infoContainer: {
    flex: 1, // Phần tử này chiếm phần lớn của hàng
  },
  name: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginBottom: 5,
  },
  phone: {
    fontSize: wp("3%"),
  },
  iconContainer: {
    flexDirection: "row", // Các icon nằm cùng một hàng
  },
  icon: {
    marginRight: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: wp("7%"),
  },
  iconblue: {
    color: "blue",
  },
  loadingContainer: {
    justifyContent: "center",
    height: hp("70%"),
  },
  loadingText: {
    marginLeft: 10,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: wp("80%"),
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PromotionDetails;
