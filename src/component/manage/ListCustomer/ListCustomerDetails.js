import React, { useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Alert,ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { getListUsers } from '../../../api/API';
import { deleteUser } from '../../../api/API';
import ConfirmBox from '../../../default/part/ConfirmBox';
import { useTranslation } from 'react-i18next';
const ListCustomerDetails = () => {
    const navigation = useNavigation();
    const [listItem, setListItem] = useState([]);
    const [changeList, setChangeList] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [idremove, setIdRemove] = useState(-1);
    const { t, i18n } = useTranslation();
    useEffect(()=>{
      try{
        getListUser();
      }catch(e){
        console.log(e)
      }
    },[changeList]);

    const getListUser = async() => {
      try{
        setLoading(true);
       const res = await getListUsers();
       if(res){
            setListItem(res);
       }
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false);
      }
    };

    const handleRemove = async(phone) => {
        const result = await deleteUser(phone);
        if(result){
          setChangeList(!changeList);
        }
    }
    const remove = (data) => {
      setIdRemove(data);
      setConfirmVisible(true);
    }
    const handleConfirm = () => {
      handleRemove(idremove);
      setConfirmVisible(false);
    };
  
    const handleCancel = () => {
      
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
        <Text style={styles.titleCustomer}>{t("lang_user_list_title")}</Text>
        <ScrollView style={styles.scrollView}>
            {listItem.map((item, index) => (
                <View key={index} style={styles.container}>
                    {/* Phần 1: Hiển thị tên và số điện thoại */}
                    <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <Text style={styles.phone}>{item.phoneNumber}</Text>
                    </View>
                    {/* Phần 2: Hiển thị icon sửa và xóa */}
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('DisplayCustomer',{phone:item.phoneNumber})}>
                            <Icon name="edit"  style={[styles.icon,styles.iconblue]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => remove(item.phoneNumber)}>
                            <Icon name="trash" style={styles.icon} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            ))}
        </ScrollView>
        <ConfirmBox
                visible={isConfirmVisible}
                message={t("lang_alert_delete_question")}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </View>   )}
        </>
    );
};

const styles = StyleSheet.create({
  scrollView: {
    height:hp('70%')
  },
  titleCustomer:{
    padding:10,
    textAlign:'center',
    fontWeight:'bold',
    color:'#724929'
  },
  container: {
    flexDirection: 'row', // Các phần tử nằm cùng một hàng
    alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoContainer: {
    flex: 1, // Phần tử này chiếm phần lớn của hàng
  },
  name: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phone: {
    fontSize: wp('3%'),
  },
  iconContainer: {
    flexDirection: 'row', // Các icon nằm cùng một hàng
  },
  icon: {
    marginRight: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize:wp('7%')
  },
  iconblue:{
    color:'blue'
  },
  loadingContainer: {
    justifyContent:'center',
    height:hp('70%')
  },
  loadingText: {
    marginLeft: 10,
    textAlign:'center'
  },
});

export default ListCustomerDetails;