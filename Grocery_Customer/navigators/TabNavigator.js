import * as React from 'react';
import { Text, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsStackNavigator from './ProductsStackNavigator'
import AccountStackNavigator from './AccountStackNavigator'
import SearchScreen from '../screens/SearchScreen'
import CartScreen from '../screens/CartScreen'
import AccountScreen from '../screens/AccountScreen'

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#16A085"
        inactiveColor="grey"
        shifting={false}
        backBehavior="none"
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen name="Menu" component={ProductsStackNavigator} options={{
          tabBarLabel: 'Menu',
          tabBarIcon:({color})=>(
            <Icon name="dns" size={24} color ={color} />
          )
        }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarLabel: 'Search',
          tabBarIcon:({color})=>(
            <Icon name="search" size={24} color ={color} />
          )
        }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{
          tabBarLabel: 'Cart',
          tabBarBadge:1,
          tabBarIcon:({color})=>(
            <Icon name="shopping-cart" size={24} color ={color} />
          )
        }} />
        <Tab.Screen name="Account" component={AccountStackNavigator} options={{
          tabBarLabel: 'Account',
          tabBarIcon:({color})=>(
            <Icon name="person" size={24} color ={color} />
          )
        }} />
      </Tab.Navigator>
    
  );
}
