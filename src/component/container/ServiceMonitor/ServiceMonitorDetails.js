// components/About.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getServiceByID } from "../../../api/API";
import { formatCurrency } from "../../../default/part/MoneyFomart";
import { URL_BE } from "../../../api/URL";

const ServiceMonitorDetails = ({ service, info }) => {
  
  const primaryURL = URL_BE;
  const [listService, setListService] = useState([]);
  useEffect(() => {
    getSV();
  }, []);

  // Lấy danh sách dịch vụ
  const getSV = async () => {
    try {
      const result = await getServiceByID(service);
      if (result) {
        setListService(result);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View style={[styles.containerService]}>
        <Text style={[styles.title]}>{info.serviceName}</Text>
        <Image
          source={{ uri: primaryURL + info.imageUrl }} // Đường dẫn đến hình ảnh của bạn
          style={styles.image}
        />
        <Text style={[styles.des]}>{info.description}</Text>
        {/* <Text>{service.content}</Text> */}
        <View style={[styles.add]}>
          {Object.keys(listService).map((key, index) => {
            const sv = listService[key];
            if (sv.useYn) {
              return (
                <View style={[styles.item]} key={index}>
                  <Text style={[styles.itemText]}>{sv.duration > 0 ? sv.duration+'min': ''}</Text>
                  <Text style={[styles.itemText]}>
                    {formatCurrency(sv.totalAmount, "vi-VN", "VND")}
                  </Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp("80%"),
    height: wp("50%"),
    borderRadius: wp("1%"),
  },
  containerService: {
    flex: 1,
    padding: wp("3%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("6%"),
    marginBottom: wp("2%"),
    color: "#724929",
  },
  des: {
    fontSize: wp("4%"),
    marginTop: wp("2%"),
    fontStyle: "italic",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
  },
  add: {
    width: "80%",
    backgroundColor: "#724929",
    padding: wp("2%"),
    borderRadius: wp("3%"),
    marginTop: wp("3%"),
  },
  itemText: {
    color: "white",
  },
});

export default ServiceMonitorDetails;
