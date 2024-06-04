import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons từ thư viện vector icons
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getServiceshort } from "../../../api/API";
import { useNavigation } from "@react-navigation/native";

//Begin Import many languages
import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
import { URL_BE } from "../../../api/URL";
//End Import many languages

const getImageSource = (imageName) => {
  switch (imageName) {
    case "1":
      return require("../../../assets/img/card/platium.png");
    case "2":
      return require("../../../assets/img/card/gold.png");
    case "3":
      return require("../../../assets/img/card/vip1.png");
    case "4":
      return require("../../../assets/img/card/platiumback.png");
    case "5":
      return require("../../../assets/img/card/goldback.png");
    case "6":
      return require("../../../assets/img/card/vip1back.png");
    default:
      return null;
  }
};

const HomeDetails = () => {
  const navigation = useNavigation();
  const [listService, setListService] = useState([]);
  const { t, i18n } = useTranslation();
  const primaryURL = URL_BE; // Đường dẫn hình ảnh
  const [linkImg, setLinkImg] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //Gọi hàm lấy danh sách dịch vụ <gọi 1 lần>
  useEffect(() => {
    getSV();
  }, []);

  const handlePress = (text) => {
    setLinkImg(text);
    toggleModal();
  };

  // Lấy danh sách dịch vụ
  const getSV = async () => {
    try {
      const result = await getServiceshort();
      if (result) {
        setListService(result);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const selectService = () => {
    try {
      setModalService(true);
    } catch (e) {
      console.log(e);
    }
  };
  //Begin Import many languages

  //End Import many languages

  return (
    <>
      <View style={styles.container}>
        <View style={styles.aboutusHeader}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" style={styles.searchIcon} color="#724929" />
            <TextInput
              style={styles.searchInput}
              placeholder={t("lang_search_home")}
              placeholderTextColor="#000000" // Màu đen cho placeholder
            />
          </View>
          <Image
            source={require("../../../assets/img/spa.png")} // Đường dẫn đến hình ảnh của bạn
            style={styles.image}
          />
        </View>
        <View>
          <ScrollView style={styles.scrollContainer}>
            {/* Phần nút menu và nút xem hết */}
            <View style={styles.contentContainer}>
              {/* Phần nút menu */}
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.buttonText}>{t("lang_special_menu")}</Text>
              </TouchableOpacity>
              {/* Phần nút xem hết */}
              <TouchableOpacity style={styles.viewAllButton}>
                {/* <Text style={styles.buttonText}>See All</Text> */}
              </TouchableOpacity>
            </View>
            {/* Các khối ảnh và tiêu đề */}

            <View style={styles.blocksContainer}>
              {Object.keys(listService).map((key, index) => {
                const sv = listService[key];
                if (sv.useYn) {
                  return (
                    <TouchableOpacity
                      style={styles.block}
                      key={sv.idService}
                      onPress={() =>
                        navigation.navigate("ServiceMonitor", {
                          service: sv.idService,
                          info: sv,
                        })
                      }
                    >
                      <View>
                        <Image
                          //  source={require('../../../assets/img/massageItem1.png')} // Đường dẫn đến hình ảnh của bạn
                          source={{ uri: primaryURL + sv.imageUrl }}
                          style={styles.blockImage}
                        />
                        <Text style={styles.title}>{sv.serviceName}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                return null;
              })}
            </View>
            {/* Phần Ưu đãi */}
            <View style={styles.promotionContainer}>
              <Text style={styles.promotionText}>
                <Text style={styles.promotionTextDes}>
                  {t("title_home_promotions")}
                </Text>{" "}
              </Text>
            </View>
            <View style={styles.additionalContainer}>
              <TouchableWithoutFeedback onPress={() => handlePress("1")}>
                <Image
                  source={require("../../../assets/img/card/platium.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handlePress("2")}>
                <Image
                  source={require("../../../assets/img/card/gold.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handlePress("3")}>
                <Image
                  source={require("../../../assets/img/card/vip1.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.additionalContainer}>
              <TouchableWithoutFeedback onPress={() => handlePress("4")}>
                <Image
                  source={require("../../../assets/img/card/platiumback.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handlePress("5")}>
                <Image
                  source={require("../../../assets/img/card/goldback.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handlePress("6")}>
                <Image
                  source={require("../../../assets/img/card/vip1back.png")} // Đường dẫn đến hình ảnh của bạn
                  style={styles.additionalImage}
                />
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <Pressable style={styles.modalBackground} onPress={toggleModal}>
            <Image
              source={getImageSource(linkImg)} // Đường dẫn đến hình ảnh của bạn
              style={styles.additionalImageModal}
            />
          </Pressable>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: hp("80%"),
  },
  aboutusHeader: {
    paddingHorizontal: 30,
    backgroundColor: "#724929", // Màu nền cho phần header
    marginBottom: wp("15%"),
    height: hp("24%"),
  },
  scrollContainer: {
    height: hp("52%"),
  },
  searchIcon: {
    fontSize: wp("7%"),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: hp("5%"), // Chiều cao ô tìm kiếm
    paddingHorizontal: 10,
    marginBottom: hp("3%"), // Khoảng cách giữa ô tìm kiếm và hình ảnh
  },
  searchInput: {
    flex: 1,
    height: hp("5%"),
    color: "black",
    marginLeft: 10, // Khoảng cách giữa biểu tượng và ô input
    fontSize: wp("3%"),
  },
  image: {
    width: "100%", // Thiết lập chiều rộng là 100%
    height: hp("20%"),
    resizeMode: "cover",
    borderRadius: 10, // Thiết lập borderRadius cho hình ảnh
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: wp("2%"),
  },
  menuButton: {},
  viewAllButton: {},
  buttonText: {
    color: "#724929",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  blocksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  block: {
    flex: 1,
    alignItems: "center",
  },
  blockImage: {
    width: wp("25%"),
    height: wp("25%"),
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    marginTop: wp("2%"),
    fontWeight: "bold",
    fontSize: wp("3%"),
  },
  promotionContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: wp("5%"),
    marginTop: wp("5%"),
  },
  promotionText: {
    fontWeight: "bold",
    fontSize: wp("4%"),
    color: "black",
    textAlign: "center",
  },
  promotionTextMoney: {
    fontSize: wp("7%"),
    color: "#CC9900",
  },
  promotionTextDes: {
    fontSize: wp("5%"),
    color: "#CC9900",
  },
  additionalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  additionalImage: {
    width: "32%",
    aspectRatio: 2, // Thiết lập tỷ lệ khung hình là 1:1 (tùy chỉnh theo nhu cầu)
    resizeMode: "cover",
  },
  additionalImageModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 20,
  },
});

export default HomeDetails;
