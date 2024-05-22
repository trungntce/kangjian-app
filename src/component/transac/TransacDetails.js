import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Alert,KeyboardAvoidingView,ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getTransac } from '../../api/API';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, toDate } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../default/part/MoneyFomart';
import { useTranslation } from 'react-i18next';
const TransacDetails = () => {
const navigation = useNavigation();
  const [listTransac,setListTranSac] = useState([]);
  let index = 0;
  const [phoneNumber,setPhoneNumber] = useState('');
  const [cardNo,setCardNo] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fill,setFill] = useState(1);
  const [cardType, setCardType] = useState('0');
  const { t, i18n } = useTranslation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if(fill == 1){
        setFromDate(format(currentDate, 'yyyy/MM/dd'));
    }else{
        setEndDate(format(currentDate, 'yyyy/MM/dd'));
    }
  };
  const getFromDate = () => {
    setFill(1);
    showDatepicker();
  }
  const getEndDate = () => {
    setFill(0);
    showDatepicker();
  }



  const showDatepicker = () => {
    setShow(!show);
  };

  
  useEffect(()=>{
        getTransact();
  },[]);
  
  const getTransact = async() => {
    try{
      let data = ``;
      if(phoneNumber.trim()){
        data += `&phoneNumber=${phoneNumber}`;
      }
      if(cardNo.trim()){
        data += `&cardNo=${cardNo}`;
      }
      if(fromDate.trim() && endDate.trim()){
        data += `&fromDate=${fromDate}&toDate=${endDate}`;
      }
      if(cardType.trim() == '2' || cardType.trim() == '1'){
        data += `&transactionType=${cardType}`;
      }
     
      const result = await getTransac(data.substring(1));
      if(result){
        setListTranSac(result);
      }
    }catch(e){
      console.log(e);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1,height:hp('400%')}}>
           <View style={[styles.containerSearch]}>
                <View style={[styles.titleContainer]}>
                    <Text style={[styles.title]}>{t("lang_lookup_transactions")}</Text>
                </View>
                <View style={[styles.itemSearch]}>
                    <Icon name="phone" style={styles.iconFooter} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder={t("lang_user_login")}
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}
                        underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                    />
                </View>
                <View style={[styles.itemSearch]}>
                    <Icon name="sticky-note" style={styles.iconFooter} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder={t("lang_input_card_no")}
                        onChangeText={(text) => setCardNo(text)}
                        value={cardNo}
                        underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                    />
                </View>
                <View style={styles.cardTypeContainer}>
                                          <TouchableOpacity
                                            style={styles.cardTypeButton}
                                            onPress={() => setCardType('0')}
                                          >
                                            <Text style={styles.cardText}>{t("lang_all")}</Text>
                                            {/* Chọn kiểu radiobox theo giá trị của cardType */}
                                            {cardType === '0' && <Icon name="dot-circle-o" style={styles.iconCard}color="#724929" />}
                                            {cardType !== '0' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            style={styles.cardTypeButton}
                                            onPress={() => setCardType('1')}
                                          >
                                            <Text style={styles.cardText}>{t("lang_topup")}</Text>
                                            {cardType === '1' && <Icon name="dot-circle-o" style={styles.iconCard} color="#724929" />}
                                            {cardType !== '1' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            style={styles.cardTypeButton}
                                            onPress={() => setCardType('2')}
                                          >
                                            <Text style={styles.cardText}>{t("lang_payment")}</Text>
                                            {cardType === '2' && <Icon name="dot-circle-o" style={styles.iconCard} color="#724929" />}
                                            {cardType !== '2' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
                                          </TouchableOpacity>
                 </View>
                <View style={[styles.itemDate]}>
                    <View style={[styles.itemDateSub]}>
                        <TouchableOpacity style={styles.buttonDate} onPress={getFromDate}>
                            <Text style={styles.textDate}>{t("lang_from_date")}</Text>
                            <TextInput
                                style={styles.inputDate}
                                placeholder="2022/01/01"
                                readOnly
                                value={fromDate}
                                underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemDateSub]}>
                        <TouchableOpacity style={styles.buttonDate} onPress={getEndDate}>
                            <Text style={styles.textDate}>{t("lang_to_date")}</Text>
                            <TextInput
                                style={styles.inputDate}
                                placeholder="2022/01/01"
                                readOnly
                                value={endDate}
                                underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={getTransact}>
                    <View style={[styles.itembutton]}>
                        <Text style={[styles.textBt]}>{t("lang_button_search")}</Text>
                    </View>
                </TouchableOpacity>
           </View>
           <View style={[styles.history]}>
                <View style={[styles.titleContainer]}>
                    <Text style={[styles.title]}>{t("lang_transaction_history")}</Text>
                </View>
                        {Object.keys(listTransac).map((key) => {
                                const ts = listTransac[key];
                                if (ts.useYn) {
                                    const itemStyle = index % 2 === 0 ? styles.evenItem : styles.oddItem; // Áp dụng style màu nền so le
                                    index++; // Tăng biến đếm khi giao dịch được hiển thị
                                return (
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryTransac',{ transacInfo:ts })} key={ts.idTransaction}>
                                        <View style={[styles.historyItem,itemStyle]} >
                                                <View style={[styles.itemLeft]}>
                                                    <Text style={[styles.itemText]}>{ts.editedDate}</Text>
                                                    <Text style={[styles.itemText]}>{ts.fullName}</Text>
                                                </View>
                                                <View style={[styles.itemRight]}>{
                                                    ts.transactionType == '1' ? (
                                                        <Text style={[styles.itemText,styles.textRight,styles.colorGreen]}>+{formatCurrency(ts.amount, 'vi-VN', 'VND')}</Text>
                                                    ): ts.transactionType == '2' ? (
                                                        <Text style={[styles.itemText, styles.textRight,styles.colorRed]}>-{formatCurrency(ts.amount, 'vi-VN', 'VND')}</Text>
                                                    ) : null
                                                }                                   
                                                </View>
                                        
                                        </View>
                                    </TouchableOpacity>
                                );
                                }
                                return null;
                        })}
           </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
    selectedDateText: {
        marginTop: 20,
        fontSize: 18,
      },
    containerSearch:{
        alignItems:'center',
        paddingTop:wp('2%')
    },
    evenItem:{
        backgroundColor:'silver'
    },
    buttonDate:{
        borderBottomColor: '#724929', // Màu của border bottom
        borderBottomWidth: 1, // Độ dày của border bottom
    },
    textDate:{
        fontSize:wp('4%'),fontStyle:'italic'
    },
    inputDate:{
        fontSize:wp('3%'),
        color:'black'
    },
    itemSearch:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor: '#724929', // Màu của border bottom
        borderBottomWidth: 1, // Độ dày của border bottom
        marginBottom: wp('5%'),
        width:'80%',
        padding:wp('2%')
    },
    itemDate:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom: wp('5%'),
        width:'80%',
        padding:wp('2%')
    },
    itemDateSub:{
        flex:1,
    },
    input:{
        fontSize:wp('3%'),
        color:'#724929',
        flex:2
    },
    iconFooter:{
        fontSize:wp('5%'),
        marginRight:wp('3%'),
        color:'#724929'
    },
    itembutton:{
        width:'80%',
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        
    },
    textBt:{
        width:wp('25%'),
        textAlign:'center',
        backgroundColor:'green',
        color:'white',
        fontWeight:'bold',
        fontSize:wp('3%'),
        padding:wp('2%'),
        borderRadius:wp('1%')
    },
    history:{
        flex:1,
        alignItems:'center'
    },
    title:{
        textAlign:'left',
        fontWeight:'bold',
        color:'#724929'
    },
    titleContainer:{
        width:'80%',marginBottom:wp('3%')
    },
    historyItem:{
        flexDirection: 'row',
        alignItems:'flex-start',
        width:'95%',
        padding:wp('2%'),
        paddingTop:wp('3%'),
        paddingBottom:wp('3%')
        // borderBottomWidth:wp('0.2%')
    },
    itemLeft:{
        flex:6
    },
    itemRight:{
        flex:4,

    },
    itemText:{
        color:'black',
        fontSize:wp('3.5%')
    },
    textRight:{
        textAlign:'right',
        fontStyle:'italic'
    },
    colorGreen:{
        color:'green'
    },
    colorRed:{
        color:'red'
    },
    cardTypeContainer:{
        flexDirection: 'row'
    },
      cardTypeButton:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: '#724929',
        borderRadius: 5,
        marginRight: wp('2%'),
      },
      cardTypeText: {
        color: '#724929',
        marginLeft: 5,
        marginRight:5
      },
      cardText: {
        marginRight:5,fontSize:wp('3%')
      },
      cardIcon:{
        fontSize:wp('4%')
      },
});

export default TransacDetails;