import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Pay from '../component/manage/Pay/Pay';
import Deposit from '../component/manage/Deposit/Deposit';
import Home from '../component/container/Home/Home';
import EditCustomer from '../component/customer/EditCustomer';
import HistoryTransaction from '../component/customer/HistoryTransaction';
import ListCustomer from '../component/manage/ListCustomer/ListCustomer';
import EditCustomerManage from '../component/manage/ListCustomer/EditCustomerManage';
import DisplayCustomer from '../component/manage/ListCustomer/DisplayCustomer';
import ManageMonitor from '../component/manage/Monitor/ManageMonitor';
import Transac from '../component/transac/Transac';
import HistoryTransac from '../component/transac/HistoryTransac';
import { AuthContext } from './AuthContext'; // Đảm bảo đường dẫn chính xác

const Stack = createStackNavigator();

const Router = () => {
  const { isLoading, isLogin } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const MainNavigator = (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
      <Stack.Screen name="Deposit" component={Deposit} options={{ headerShown: false }} />
      <Stack.Screen name="EditCustomer" component={EditCustomer} options={{ headerShown: false }} />
      <Stack.Screen name="ListCustomer" component={ListCustomer} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryTransaction" component={HistoryTransaction} options={{ headerShown: false }} />
      <Stack.Screen name="EditCustomerManage" component={EditCustomerManage} options={{ headerShown: false }} />
      <Stack.Screen name="DisplayCustomer" component={DisplayCustomer} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ManageMonitor" component={ManageMonitor} options={{ headerShown: false }} />
      <Stack.Screen name="Transac" component={Transac} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryTransac" component={HistoryTransac} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  const AuthNavigator = (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isLogin ? MainNavigator : AuthNavigator}
    </NavigationContainer>
  );
};

export default Router;