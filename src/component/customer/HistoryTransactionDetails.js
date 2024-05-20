import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ thư viện

const HistoryTransactionDetails = () => {
    const [username, setUsername] = useState('kangjian');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [idCard, setIdCard] = useState('');
    const [cardType, setCardType] = useState('VIP1');
    const [selectedNumber, setSelectedNumber] = useState('1'); // Thêm state cho số được chọn
    const [showNumberOptions, setShowNumberOptions] = useState(false);
  
    const numbers = ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11', '12', '13', '14', '15'];
    const toggleNumberOptions = () => {
      setShowNumberOptions(!showNumberOptions);
    };
  
    const selectNumber = (number) => {
      setSelectedNumber(number);
      toggleNumberOptions();
    };
    const handleRegister = () => {
      // Xử lý logic khi người dùng nhấn nút hoàn thành
      console.log('Ngày tháng năm sinh:', birthdate);
    };
  
    const handleLogin = () => {
      // Xử lý logic đăng nhập ở đây
    
    };
  
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Lịch sử giao dịch</Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color="#724929" style={styles.icon} />
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
            <Icon name="lock" size={20} color="#724929" style={styles.icon} />
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
              <Icon name="phone" size={20} color="#724929" style={styles.icon} />
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
              <Icon name="calendar" size={20} color="#724929" style={styles.icon} />
              <TextInput
              style={styles.input}
              placeholder="Ngày tháng năm sinh (vd: DD/MM/YYYY)"
              onChangeText={(text) => setBirthdate(text)}
              value={birthdate}
              />
          </View>
          <View style={styles.inputWrapper}>
              <Icon name="id-card" size={20} color="#724929" style={styles.icon} />
              <TextInput
              style={styles.input}
              placeholder="Căn cước công dân"
              onChangeText={(text) => setIdCard(text)}
              value={idCard}
              />
          </View>
          <View style={styles.inputWrapper}>
            {/* Icon của loại thẻ */}
            <Icon name="credit-card" size={20} color="#724929" style={styles.icon} />
            {/* Radiobox cho các loại thẻ */}
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP1')}
              >
                <Text style={styles.cardText}>GOLD</Text>
                {/* Chọn kiểu radiobox theo giá trị của cardType */}
                {cardType === 'VIP1' && <Icon name="dot-circle-o" size={20} color="#724929" />}
                {cardType !== 'VIP1' && <Icon name="circle-o" size={20} color="#724929" />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP2')}
              >
                <Text style={styles.cardText}>PLATIUM</Text>
                {cardType === 'VIP2' && <Icon name="dot-circle-o" size={20} color="#724929" />}
                {cardType !== 'VIP2' && <Icon name="circle-o" size={20} color="#724929" />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardTypeButton}
                onPress={() => setCardType('VIP3')}
              >
                <Text style={styles.cardText}>VIP3</Text>
                {cardType === 'VIP3' && <Icon name="dot-circle-o" size={20} color="#724929" />}
                {cardType !== 'VIP3' && <Icon name="circle-o" size={20} color="#724929" />}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.inputWrapper} onPress={toggleNumberOptions}>
            {/* Icon của chọn số */}
            <Icon name="credit-card" size={20} color="#724929" style={styles.icon} />
            {/* Giá trị số được chọn */}
            <Text style={styles.selectedNumber}>{selectedNumber}</Text>
          </TouchableOpacity>
          {/* Dropdown cho việc chọn số */}
          {showNumberOptions && (
           <View style={styles.dropdownContainer}>
           <ScrollView style={styles.dropdown}>
             {numbers.map((number) => (
               <TouchableOpacity
                 key={number}
                 style={styles.dropdownItem}
                 onPress={() => selectNumber(number)}
               >
                 <Text style={styles.optionText}>{number}</Text>
               </TouchableOpacity>
             ))}
           </ScrollView>
         </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Hoàn thành</Text>
          </TouchableOpacity>
         
        </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#724929'
    },
    inputWrapper: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#724929', // Màu của border bottom
      borderBottomWidth: 1, // Độ dày của border bottom
      marginBottom: 20,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      height: 40,
      paddingLeft: 10,
      flex: 1,
    },
    button: {
      backgroundColor: '#724929',
      width: '80%',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop:15
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cardTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:10,
      marginBottom:10
    },
    cardTypeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#724929',
      borderRadius: 5,
      marginRight: 10,
    },
    selected: {
      backgroundColor: '#724929',
    },
    cardTypeText: {
      color: '#724929',
      marginLeft: 5,
      marginRight:5
    },
    cardText: {
      marginRight:5
    },
    dropdownContainer: {
      position: 'absolute',
      width: '80%',
      maxHeight: 230, // Đặt chiều cao tối đa cho dropdown
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
  });

export default HistoryTransactionDetails;