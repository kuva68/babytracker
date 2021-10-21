
import * as React from 'react';
import {  StyleSheet, View, Text,Dimensions,TouchableOpacity} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import Header from '../components/Header'
//import {Button,Text,Icon} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
 import {FontAwesome, Ionicons} from '@expo/vector-icons'
const deviceW = Dimensions.get('window').width
const deviceH = Dimensions.get('window').height

export default function HomeScreen({navigation}) {
const dispatch = useDispatch()  
const lang = useSelector((state)=>{
  return state.lang
})

const status = useSelector((state)=>{
  return state.status
})

  const langObj = {eng:{parent:'PARENT',child:'CHILD',choose:'Select status'},
  ru:{parent:'РОДИТЕЛЬ',child:'РЕБЕНОК',choose:'Выберите статус'}}
  return (
    <View style={styles.main}>
     <Header />
<View style={styles.body}>
  <Text style={styles.title}>{langObj[lang].choose}</Text>
  
<TouchableOpacity       onPress={()=>{dispatch({type:'status',status:
                        "parentPending"})
                        navigation.replace('ParentRequest')}}>
    <View   style={{...styles.button,opacity:status==='start'?1:0.3}}>    
                                      
          <FontAwesome name='user-secret'size={35}color='white'/>
          <Text style={styles.buttontext}>
          {langObj[lang].parent}
          </Text>
    </View>    

</TouchableOpacity>
<TouchableOpacity        onPress={()=>{dispatch({type:'status',
                                      status:'babyRegistration'})
                                  navigation.replace('Baby')}}>
 <View   style={{...styles.button,opacity:status==='start'?1:0.3}}>    
                                      
          <MaterialIcons name='child-care'size={35}color='white'/>
          <Text style={styles.buttontext}>
          {langObj[lang].child}
          </Text>
    </View>    

</TouchableOpacity>
    </View>
    </View>
  )
 
}
const styles = StyleSheet.create({
  main:{
    justifyContent:'flex-start',
    flex:1               
  },
  body:{flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#e8e8e8",
        },
  button:{
    width:deviceW * 0.7,
    height:50,
    flexDirection:'row',
    backgroundColor:'blue',
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius: 25,
    
    marginVertical:50
  } ,
  title:{
    fontSize:25,
    color:'blue',
    textAlign:'center'
  },
  buttontext:{
    fontSize:18,
    color:'#e7e7e7',
    textAlign:'center'
  }
})