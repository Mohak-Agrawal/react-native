import React,{useEffect} from 'react';
import { Text, View,Alert } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen'
import ProductsTabNavigator from './ProductsTabNavigator'
import PastOrdersScreen from '../screens/PastOrdersScreen'

const Tab = createMaterialBottomTabNavigator();
export default function TabNavigator()
{
  return (
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#16A085"
      inactiveColor="grey"
      backBehavior="none"
      shifting={false}
      barStyle={{ backgroundColor: 'white' }}
      
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon:({color})=>(
            <Icon name="home" size={24} color ={color} />
          )
        }} />
        
        <Tab.Screen name="Products" component={ProductsTabNavigator} options={{
          tabBarLabel: 'Products',
          tabBarIcon:({color})=>(
            <Icon name="dns" size={24} color ={color} />
          )
        }}/>
        <Tab.Screen name="PastOrders" component={PastOrdersScreen} options={{
          tabBarLabel: 'Past Orders',
          tabBarIcon:({color})=>(
            <Icon name="low-priority" size={24} color ={color} />
          )
        }}/>
      </Tab.Navigator>
  );
}
