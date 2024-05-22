import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://66.42.48.193:8000/api';

// const insertData = async (data) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const response = await fetch(`${BASE_URL}/data`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.log('Error inserting data:', error);
//     throw error;
//   }
// };
const updateUserWithCard = async (data) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user-card`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    //const responseData = await response.json();
    return response;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}
const updateUser = async (data) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user/personal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}

const updatePromotion = async (data) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/topup-promotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}

const updatePayment = async (data) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/payment/service`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}
const getListUsers = async () =>{
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      return responseData.result;
    } catch (error) {
      console.log('Error inserting data:', error);
      throw error;
    }
}
const getListPromotion = async () =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/topup-promotion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const getPersonal = async () =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user/personal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const getUserByPhone = async (phone) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user/${phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const addUser = async (data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      return false;
    }
    //const responseData = await response.json();
    return true;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}

const deleteUser = async (phone) =>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user/${phone}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    //const responseData = await response.json();
    return response;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}


// Đăng nhập vào hệ thống
const loginScreen = async(username, password)=>{
    try {
        const data = {
          username: username,
          password: password
        };
        const response = await axios.post(`${BASE_URL}/authenticate`, data, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if(!response.data){
            return false;
        }
        
        return response.data;
      } catch (error) {
        return false;
      }
}

const getNumberCard = async ()=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/cards/not-activated`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}
const getPromotion = async (money)=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/topup-promotion/${money}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const getCardActive = async ()=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/cards/activated`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const addUserWithCard = async (data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/user-card`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      return false;
    }
    //const responseData = await response.json();
    return true;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}


const addDeposit = async(data)=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/top-up`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      return false;
    }
    //const responseData = await response.json();
    return true;
  } catch (error) {
    console.log('Error inserting data:', error);
    return false;
  }
}


const getService = async ()=>{
  try {
    const response = await fetch(`${BASE_URL}/v1/service`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}
const getServiceByID = async (data)=>{
  try {
    const response = await fetch(`${BASE_URL}/v1/service/${data}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}
const getServiceshort = async ()=>{
  try {
    const response = await fetch(`${BASE_URL}/v1/service/short`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}

const getTransac = async (data)=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/v1/transactions?${data}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.log('Error inserting data:', error);
    throw error;
  }
}





export { loginScreen,getListUsers,getPersonal,updateUser,addUser,deleteUser,getNumberCard,getServiceByID,getListPromotion,updatePromotion,updatePayment,updateUserWithCard,getPromotion,addUserWithCard,getService,getServiceshort,getCardActive,getTransac,addDeposit,getUserByPhone};