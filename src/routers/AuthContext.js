import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [permission,setPermission] = useState(null);
  const [isMenu,setIsMenu] = useState([{
    menuName:"HOME",
    menuUrl :"HOME",
    useYn:"Y",
  }]);

  const [menuFooter, setMenuFooter] = useState(
    [{
      idMenu:1
    }]
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        // Call the signOut function when the app moves to the background
        logout();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const expirationTime = await AsyncStorage.getItem('expirationTime');
          const currentTime = Date.now();
          setIsLogin(true);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (token, expirationTime) => {
    if (token && expirationTime) {
      // Lưu token và thời gian hết hạn vào AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('expirationTime', expirationTime.toString());
      setIsLogin(true);
    }
  };
  const permiss = async(permis) => {

      if(permis){
        setPermission(permis[0].roleName);
      
      }
  
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expirationTime');
    setIsLogin(false);
  };

  const menu = async (menu) => {
      if(menu){
        setIsMenu(menu);
      }
  }



  return (
    <AuthContext.Provider value={{ isLoading, isLogin, login, logout,permiss,isMenu,permission }}>
      {children}
    </AuthContext.Provider>
  );
};