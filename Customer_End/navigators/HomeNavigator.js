import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuScreen from '../screens/MenuScreen'
import SearchScreen from '../screens/SearchScreen'
import CartScreen from '../screens/CartScreen'
import AccountScreen from '../screens/AccountScreen'



const Tab = createMaterialBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Menu"
        activeColor="#16A085"
        inactiveColor="grey"
        shifting={false}
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen name="Menu" component={MenuScreen} options={{
          tabBarLabel: 'Menu',
          tabBarIcon:({color})=>(
            <Icon name="list" size={24} color ={color} />
          )
        }}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarLabel: 'Search',
          tabBarIcon:({color})=>(
            <Icon name="search" size={24} color ={color} />
          )
        }}/>
        <Tab.Screen name="Cart" component={CartScreen} options={{
          tabBarLabel: 'Cart',
          tabBarIcon:({color})=>(
            <Icon name="shopping-cart" size={24} color ={color} />
          )
        }}/>
        <Tab.Screen name="Account" component={AccountScreen} options={{
          tabBarLabel: 'Account',
          tabBarIcon:({color})=>(
            <Icon name="person" size={24} color ={color} />
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
