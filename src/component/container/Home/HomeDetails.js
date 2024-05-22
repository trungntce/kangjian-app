import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons từ thư viện vector icons
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getServiceshort } from "../../../api/API";
import { useNavigation } from "@react-navigation/native";

//Begin Import many languages
import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n';
//End Import many languages

const HomeDetails = () => {
  const navigation = useNavigation();
  const [listService, setListService] = useState([]);
  const { t, i18n } = useTranslation();
  const primaryURL = "http://66.42.48.193:8000"; // Đường dẫn hình ảnh
  
  
  //Gọi hàm lấy danh sách dịch vụ <gọi 1 lần>
  useEffect(() => {
    getSV();
  }, []);


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
            placeholder={t('lang_search_home')}
            placeholderTextColor="#000000" // Màu đen cho placeholder
          />
        </View>
        <Image
          source={require("../../../assets/img/massage.png")} // Đường dẫn đến hình ảnh của bạn
          style={styles.image}
        />
      </View>
      {/* Phần nút menu và nút xem hết */}
      <View style={styles.contentContainer}>
        {/* Phần nút menu */}
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.buttonText}>{t('lang_special_menu')}</Text>
        </TouchableOpacity>
        {/* Phần nút xem hết */}
        <TouchableOpacity style={styles.viewAllButton}>
          {/* <Text style={styles.buttonText}>See All</Text> */}
        </TouchableOpacity>
      </View>
      {/* Các khối ảnh và tiêu đề */}
      <View style={styles.blocksContainer}>
        {Object.keys(listService).map((key,index) => {
          const sv = listService[key];
          if (sv.useYn) {
            return (
              <TouchableOpacity
                  style={styles.block} 
                  key={sv.idService}
                  onPress={() => navigation.navigate('ServiceMonitor',{ service:sv.idService,info:sv })}
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
        {t('title_home_promotions')}
        </Text>
      </View>
      <View style={styles.additionalContainer}>
        <Image
          source={require("../../../assets/img/gold.png")} // Đường dẫn đến hình ảnh của bạn
          style={styles.additionalImage}
        />
        <Image
          source={require("../../../assets/img/platiumno.png")} // Đường dẫn đến hình ảnh của bạn
          style={styles.additionalImage}
        />
        <Image
          source={require("../../../assets/img/simplecard.png")} // Đường dẫn đến hình ảnh của bạn
          style={styles.additionalImage}
        />
      </View>
      
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
    color: "#724929",
    textAlign: "center",
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
    borderRadius: 10,
  },
});

export default HomeDetails;
