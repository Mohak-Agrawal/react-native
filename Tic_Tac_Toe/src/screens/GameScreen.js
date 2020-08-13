import React, { Component } from 'react'
import { Text, View ,Alert,Modal,Dimensions, Image ,BackHandler} from 'react-native'
import Styles from '../styles/GlobalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PRIMARY_APP_COLOR} from '../assets/constants/Strings'
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;

export default class GameScreen extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         gameState : [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
         currentPlayer : 1,
         winner:'',
         modalVisible:false
      }
    }
    componentDidMount() {
      this.initializeGame()
    }
  
    initializeGame = () => {
        this.setState({
          gameState:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          currentPlayer:1
        })
    }

    renderSign = (row,column) => {
      var value = this.state.gameState[row][column]
      switch(value){
        case 1 : 
          return <Text style={Styles.zeroSymbol}>O</Text>
        case -1 :
          return <Text style={Styles.xSymbol}>X</Text>  
        default :
          return <View/>
      }
    }

    onTilePress = (row,column) => {
      var value = this.state.gameState[row][column]
      if(value !== 0) {return}
      var currentPlayer = this.state.currentPlayer
      var arr = this.state.gameState.slice()
      arr[row][column] = currentPlayer
      this.setState({gameState:arr})
      
      var nextPlayer = (currentPlayer === 1) ? -1 : 1
      this.setState({currentPlayer:nextPlayer})

      var winner = this.getWinner()
      if(winner == 1){
        this.setState({winner:'Player 1 won!',modalVisible:true})
        this.initializeGame()
      }
      else if(winner == -1){
        this.setState({winner:'Player 2 won!',modalVisible:true})
        this.initializeGame()
      }
    }

    getWinner = () => {
      const NUM_TILES = 3
      var arr = this.state.gameState
      var sum;

      for(var i=0; i<NUM_TILES; i++){
        sum = arr[i][0] + arr[i][1] + arr[i][2] 
        if(sum == 3) {return 1}
        else if(sum == -3) {return -1}
      }

      for(var i=0; i<NUM_TILES; i++){
        sum = arr[0][i] + arr[1][i] + arr[2][i] 
        if(sum == 3) {return 1}
        else if(sum == -3) {return -1}
      }

      sum = arr[0][0] + arr[1][1] + arr[2][2]
      if(sum == 3) {return 1}
      else if(sum == -3) {return -1}

      sum = arr[2][0] + arr[1][1] + arr[0][2]
      if(sum == 3) {return 1}
      else if(sum == -3) {return -1}

      return 0
    }

    onResetGame = () => {
      this.initializeGame()
    }
    

    render() {
        return (
            <View style={Styles.gameContainer}>
              <Modal
              transparent={true}
              animationType="slide"
              visible={this.state.modalVisible}
              >
                <View style={[Styles.modal,{marginTop:windowHeight/5}]}>
                    <Image source={require('../assets/images/trophy.png')} resizeMode={'contain'}/>
                    <Text style={[Styles.playerText,{color:this.state.winner != "Player 1 won!" ? 'black' : PRIMARY_APP_COLOR }]}>{this.state.winner}</Text>
                    <TouchableOpacity onPress={() => this.setState({modalVisible:false})}>
                      <View style={Styles.button}>
                        <Text style={Styles.buttonText}>Ok</Text>
                      </View>
                    </TouchableOpacity>
                </View>
              </Modal>
              <View style={Styles.toolbar}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" size={28}/>
                </TouchableOpacity>
              </View>
              <Text style={[Styles.playerText,{color:this.state.currentPlayer != 1 ? 'black' : PRIMARY_APP_COLOR }]}>
                {this.state.currentPlayer != 1 ?'Player 2 turn' : 'Player 1 turn'}
              </Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[Styles.tile,{borderLeftWidth:0,borderTopWidth:0}]} onPress={() => this.onTilePress(0,0)}>
                  {this.renderSign(0,0)}
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.tile,{borderTopWidth:0}]} onPress={() => this.onTilePress(0,1)}>
                  {this.renderSign(0,1)}
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.tile,{borderRightWidth:0,borderTopWidth:0}]} onPress={() => this.onTilePress(0,2)}>
                  {this.renderSign(0,2)}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[Styles.tile,{borderLeftWidth:0}]} onPress={() => this.onTilePress(1,0)}>
                  {this.renderSign(1,0)}
                </TouchableOpacity>
                <TouchableOpacity style={Styles.tile} onPress={() => this.onTilePress(1,1)}>
                  {this.renderSign(1,1)}
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.tile,{borderRightWidth:0}]} onPress={() => this.onTilePress(1,2)}>
                  {this.renderSign(1,2)}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[Styles.tile,{borderLeftWidth:0,borderBottomWidth:0}]} onPress={() => this.onTilePress(2,0)}>
                  {this.renderSign(2,0)}
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.tile,{borderBottomWidth:0}]} onPress={() => this.onTilePress(2,1)}>
                  {this.renderSign(2,1)}
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.tile,{borderRightWidth:0,borderBottomWidth:0,marginBottom:30}]} onPress={() => this.onTilePress(2,2)}>
                  {this.renderSign(2,2)}
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity onPress={() => this.onResetGame()}>
                <View style={Styles.button}>
                  <Text style={Styles.buttonText}>RESET</Text> 
                </View>
              </TouchableOpacity>
            </View>
        )
    }
}
