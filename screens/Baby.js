import {View,StyleSheet, Dimensions,Text} from 'react-native'
import * as React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { SimpleLineIcons,FontAwesome5 } from '@expo/vector-icons';
import BabyConfirm from '../components/babyConfirm'
import Header from '../components/Header'
import Registration from '../components/registration'

const deviceH = Dimensions.get('window').height

export default function Baby(){
    const dispatch = useDispatch()
     const lang = useSelector((state)=>{
        return state.lang
    })
   const appStatus = useSelector((state)=>{
       return state.status
   }) 
   langObj = {eng:{watingOffer:'Waiting parents request',baby:'Child'},   
           ru:{watingOffer:'Ожидаем  запрос родителя',baby:'Ребенок'}}
    
    return (
        <View style={styles.main}>
          <Header/>
          <View style={{width:'100%',minHeight: deviceH}}>
             {appStatus==='babyRegistration'?<Registration/>:
            appStatus==='babyPanding'?(
                <View style={{justifyContent:'space-around',
                 alignItems:'center',paddingTop:50}}>
           <SimpleLineIcons name="people" size={80} color="#666" />
            <Text style={{fontSize:16,color:'red',
          textAlign:'center',marginVertical:70}}>
                                    {langObj[lang].watingOffer}</Text>
           <FontAwesome5 name="map-marker-alt" size={80} color="#666" />                    
                </View>                    
                    )                
           :appStatus==='getOffer'?
            < BabyConfirm/>:<Text style={{fontSize:40,color:'blue',
              textAlign:'center',marginTop:50}}>
                             {langObj[lang].baby} </Text>}
        </View>
       </View>
    )
} 

const deviceW = Dimensions.get('window').width
const styles = StyleSheet.create({
    body:{
        width:deviceW,
        height:deviceH,
        justifyContent:'center',
        alignItems:'center',
        

        },
    main:{
        width:deviceW,
        minHeight: deviceH,
        justifyContent:'flex-start',
        alignItems:'center'
         },
  
})