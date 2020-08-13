import { StyleSheet } from 'react-native'
import {PRIMARY_APP_COLOR,PRIMARY_FONT} from '../assets/constants/Strings'
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
    backgroundColor:'white'
  },
  menuContainer:{
    alignItems: 'center',
    justifyContent:'space-evenly',
    paddingVertical:80,
    flex:1,
    backgroundColor:'white'
  },
  gameContainer: {
    alignItems: 'center',
    flex:1,
    backgroundColor:'white'
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000'
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [
      {translateX: 100}
    ]
  },
  card:{
    elevation: 5,
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    padding:10,
    marginVertical:10,
    width:"90%",
    borderRadius:10,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent:'space-between',
    paddingVertical:50,
    marginTop:50,

  },
  button:{
    width:'90%',
    paddingVertical:15,
    paddingHorizontal:20,
    backgroundColor:PRIMARY_APP_COLOR,
    justifyContent:'center',
    alignItems:'center',
    elevation:10,
    borderRadius:30,
    alignSelf:'center',
    marginVertical:20
  },
  buttonText:{
    fontSize:24,
    color:'white',
    fontFamily:PRIMARY_FONT
  },
  toolbar:{
    width:'100%',
    alignItems:'flex-start',
    padding:20 ,
  },
  tile:{
    width:100,
    height:100,
    borderWidth:2,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  zeroSymbol:{
    fontFamily:PRIMARY_FONT,
    fontSize:100,
    color:PRIMARY_APP_COLOR
  },
  xSymbol:{
    fontFamily:PRIMARY_FONT,
    fontSize:100,
    color:'black'
  },
  playerText:{
    marginTop:20,
    marginBottom:50,
    fontSize:28,
    fontFamily:PRIMARY_FONT
  },
  modal:{
    width:'70%',
    height:'50%',
    alignItems:'center',
    alignSelf:'center',
    paddingVertical:40,
    paddingHorizontal:20,
    elevation:5,
    backgroundColor:'white',
    borderRadius:10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent:'space-between',

  }
})

