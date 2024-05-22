import React,{useState} from 'react';
import { View, Text, StyleSheet,KeyboardAvoidingView,ScrollView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatCurrency } from '../../default/part/MoneyFomart';


const HistoryTransacDetails = ({transacInfo}) => {
  const [timetransact, setTimeTransact] = useState(transacInfo ? transacInfo.editedDate : '');
  const [money, setMoney] = useState(transacInfo ? transacInfo.amount : '');
  const [type,setType] = useState(transacInfo ? transacInfo.transactionTypeName : '');
  const [phoneNumber,setPhoneNumber] = useState(transacInfo ? transacInfo.phoneNumber : '');
  const [fullName,setFullName] = useState(transacInfo ? transacInfo.fullName : '');
  const [cardNo,setCardNo] = useState(transacInfo ? transacInfo.cardNo : '');
  return (
    <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1,height:hp('100%')}}>
       <View style={[styles.hisContainer]}>
            <View style={[styles.item]}>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Thời gian giao dịch</Text>
                    <Text style={[styles.value]}>{timetransact}</Text>
                </View>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Số tiền</Text>
                    <Text style={[styles.value]}>{formatCurrency(money, 'vi-VN', 'VND')}</Text>
                </View>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Loại giao dịch</Text>
                    <Text style={[styles.value]}>{type}</Text>
                </View>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Số thẻ</Text>
                    <Text style={[styles.value]}>{cardNo}</Text>
                </View>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Số điện thoại</Text>
                    <Text style={[styles.value]}>{phoneNumber}</Text>
                </View>
                <View style={[styles.itemList]}>
                    <Text style={[styles.title]}>Tên</Text>
                    <Text style={[styles.value]}>{fullName}</Text>
                </View>
            </View>
       </View>
       </ScrollView>
       </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
    hisContainer:{
        flex:1,
        backgroundColor:'#EEEEEE',
        alignItems:'center',paddingTop:wp('5%')
    },
    item:{
        width:'95%',
        backgroundColor:'white',padding:wp('5%'),
        borderRadius:wp('4%')
    },
    itemList:{
        borderBottomColor: '#724929', // Màu của border bottom
        borderBottomWidth: 1, // Độ dày của border bottom
        paddingBottom:wp('2%'),
        marginBottom:wp('5%')
    },
    title:{
        fontSize:wp('4%')
    },
    value:{
        fontSize:wp('4%'),
        fontStyle:'italic'
    }
});

export default HistoryTransacDetails;