import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import { category } from "../data/tempData";

export default class CategoryScreen extends Component {
    render() {
        return (
            category.map((item,i)=>{
                return(
            <List.AccordionGroup >
                <List.Accordion title={item.text} id={item.id}>
                <List.Item title="Item 1" />
                </List.Accordion>
             </List.AccordionGroup>
                )})
        )
    }
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  })