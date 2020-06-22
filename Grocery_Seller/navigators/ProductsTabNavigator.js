import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ItemScreen from '../screens/ItemsScreen'
import CategoryScreen from '../screens/CategoryScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

export default function ProductsTabNavigator() {
  return (
    
      <Tab.Navigator
        tabBarOptions={{
            activeTintColor:'white',
            style: { backgroundColor: '#16A085' },
            indicatorStyle:{backgroundColor:'white'},
            showIcon:true
          }}

    
      >
        <Tab.Screen name="Items" component={ItemScreen} options={{
          tabBarLabel: 'Items',
          tabBarIcon:({color})=>(
            <Icon name="view-list" size={24} color ={color} />
          )
        }}/>
        <Tab.Screen name="Category" component={CategoryScreen} options={{
          tabBarLabel: 'Category',
          tabBarIcon:({color})=>(
            <Icon name="widgets" size={24} color ={color} />
          )
          }}/>
      </Tab.Navigator>
    
  );
}
