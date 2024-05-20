import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { updateUser } from '../../../api/API';
import { alertBox } from '../../../default/part/Notify';
import { getNumberCard,updateUserWithCard } from '../../../api/API';

const EditCustomerManageDetails = ({userInfo}) => {
 console.log(userInfo)
    const [idUser, setIdUser] = useState(userInfo ? userInfo.idUser : -1);
    const [username, setUsername] = useState(userInfo ? userInfo.fullName : '');
    const [password, setPassword] = useState(userInfo ? userInfo.password : '');
    const [phoneNumber, setPhoneNumber] = useState(userInfo ? userInfo.phoneNumber : '');
    const [birthdate, setBirthdate] = useState(userInfo ? userInfo.birthday : '');
    const [idCard, setIdCard] = useState(userInfo ? userInfo.cccd : '');
    const [cardType, setCardType] = useState('1');
    //const [selectedNumber, setSelectedNumber] = useState('1'); // Thêm state cho số được chọn
    const [loading, setLoading] = useState(false);
    const [changeList, setChangeList] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [showNumberOptions, setShowNumberOptions] = useState(false);
    const [numbers, setNumbers] = useState(null);
    const [cardKey,setCardKey] = useState(null);
    const [moneys,setMoneys] = useState('0');

    //const numbers = ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11', '12', '13', '14', '15'];
    const toggleNumberOptions = () => {
      setShowNumberOptions(!showNumberOptions);
    };

    const selectNumber = (number,cardType,idCard) => {
      setCardType(cardType);
      setSelectedNumber(number);
      setCardKey(idCard);
      toggleNumberOptions();
    };
  
    const handleUpdate = async() => {
      try{setLoading(true);
        const data = {
            phoneNumber:phoneNumber,
            fullName:username,
            cccd:idCard,
            cardNo:111111,
            availableBalance:100000,
            cardType:1,
            idCard:1
        };
        const result = await updateUserWithCard(data);
        if(result){
          console.log(result)
            alertBox("Hoàn thành chỉnh sửa!")
        }else{
          alertBox("Đã có lỗi xảy ra!")
        }
      }catch(e){
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    };
    useEffect(()=>{
      try{
        listNumber();
      }catch(e){
        console.log(e)
      }
    },[]);
    const listNumber = async() =>{
        try {
            const res = await getNumberCard();
            if(res){
              setNumbers(res);
            }
        } catch (e) {
          
        }
    }

    return (
      <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Thông tin tài khoản</Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              onChangeText={(text) => setUsername(text)}
              value={username}
              readOnly
              underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock"  style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
            />
          </View>
          <View style={styles.inputWrapper}>
              <Icon name="phone"  style={styles.icon} />
              <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  keyboardType="numeric" // Chỉ cho phép nhập số
                  underlineColorAndroid="transparent" // Xóa border mặc định của TextInput
              />
          </View>
          <View style={styles.inputWrapper}>
              <Icon name="calendar" style={styles.icon} />
              <TextInput
              style={styles.input}
              placeholder="Ngày tháng năm sinh (vd: DD/MM/YYYY)"
              onChangeText={(text) => setBirthdate(text)}
              value={birthdate}
              />
          </View>
          <View style={styles.inputWrapper}>
              <Icon name="id-card" style={styles.icon} />
              <TextInput
              style={styles.input}
              placeholder="Căn cước công dân"
              onChangeText={(text) => setIdCard(text)}
              value={idCard}
              />
          </View>
          <View style={styles.inputWrapper}>
            {/* Icon của loại thẻ */}
            <Icon name="credit-card" style={styles.icon} />
            {/* Radiobox cho các loại thẻ */}
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP1')}
              >
                <Text style={styles.cardText}>GOLD</Text>
                {/* Chọn kiểu radiobox theo giá trị của cardType */}
                {cardType === '1' && <Icon name="dot-circle-o" style={styles.iconCard}color="#724929" />}
                {cardType !== '1' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP2')}
              >
                <Text style={styles.cardText}>PLATIUM</Text>
                {cardType === '2' && <Icon name="dot-circle-o" style={styles.iconCard} color="#724929" />}
                {cardType !== '2' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP3')}
              >
                <Text style={styles.cardText}>VIP3</Text>
                {cardType === '3' && <Icon name="dot-circle-o" style={styles.iconCard} color="#724929" />}
                {cardType !== '3' && <Icon name="circle-o" style={styles.iconCard} color="#724929" />}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.inputWrapper} onPress={toggleNumberOptions}>
          {/* Icon của chọn số */}
          <Icon name="credit-card" color="#724929" style={styles.icon} />
          {/* Giá trị số được chọn */}
          <Text style={styles.selectedNumber}>{selectedNumber}</Text>
        </TouchableOpacity>
        {/* Dropdown cho việc chọn số */}
        {showNumberOptions && (
         <View style={styles.dropdownContainer}>
         <ScrollView style={styles.dropdown}>
           {Object.keys(numbers).map((key) => {
                const num = numbers[key];
                if (num.useYn) {
                  return (
                    <TouchableOpacity
                    key={num.idCard}
                    style={styles.dropdownItem}
                    onPress={() => selectNumber(num.cardNo,num.cardType,num.idCard)}
                  >
                    <Text style={styles.optionText}>{num.cardNo}</Text>
                  </TouchableOpacity>
                  );
                }
                return null;
            })}
         </ScrollView>
       </View>)}
       <View style={styles.inputWrapper}>
              <Text>Số tiền</Text>
              <TextInput
              style={styles.input}
              placeholder="Số tiền nạp"
              onChangeText={(text) => setMoneys(text)}
              value={moneys}
              keyboardType='numeric'
              />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Hoàn thành</Text>
          </TouchableOpacity>
         
        </View>)}
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 5,
      alignItems: 'center',
    },
    title: {
      fontSize: wp('5%'),
      fontWeight: 'bold',
      marginBottom: wp('2%'),
      color: '#724929'
    },
    inputWrapper: {
      width: wp('80%'),
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#724929', // Màu của border bottom
      borderBottomWidth: 1, // Độ dày của border bottom
      marginBottom: wp('2%'),
    },
    icon: {
      marginRight: wp('2%'),
      color:'#724929',
      fontSize:wp('5%')
    },
    input: {
      height: hp('7%'),
      paddingLeft: 10,
      flex: 1,
      fontSize:wp('3%'),
      color:'black'
    },
    button: {
      backgroundColor: '#724929',
      width: '80%',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: wp('2%'),
      marginTop:wp('2%')
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cardTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:wp('3%'),
      marginBottom:wp('3%')
    },
    iconCard:{
      fontSize:wp('4%')
    },  
    cardTypeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('2%'),
      paddingVertical: wp('2%'),
      borderWidth: 1,
      borderColor: '#724929',
      borderRadius: 5,
      marginRight: wp('2%'),
    },
    selected: {
      backgroundColor: '#724929',
    },
    cardTypeText: {
      color: '#724929',
      marginLeft: 5,
      marginRight:5,
      fontSize:wp('2%')
    },
    cardText: {
      marginRight:wp('2%'),
      fontSize:wp('3%')
    },
    loadingContainer: {
      justifyContent:'center',
      height:hp('70%')
    },
    loadingText: {
      marginLeft: 10,
      textAlign:'center'
    },
    dropdownContainer: {
      position: 'absolute',
      width: '80%',
      maxHeight: hp('33%'), // Đặt chiều cao tối đa cho dropdown
      backgroundColor: '#724929',
      elevation: 5,
      borderRadius: 5,
      top:'30%'
    },
    dropdown: {
      flex: 1,
    },
    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      color:'red'
    },
    optionText: {
      color:'white',
      fontWeight:'bold'
    },
    selectedNumber:{
      fontSize:wp('3%'),
      marginLeft:wp('2%')
    }
});

export default EditCustomerManageDetails;