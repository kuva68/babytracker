import * as React from 'react'
import {View,TouchableOpacity,Text,StyleSheet,Dimensions} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import {Button} from 'react-native-paper'
export default function BabyConfirm(){
    const dispatch = useDispatch()
    
   const lang = useSelector((state)=>{
       return state.lang
      }) 
    const parent = useSelector((state)=>{
        return state.parent
    })
   const obj = {eng:{confirmQuestion:`Can will be ${parent} you parent ?` ,
                     yes:'Confirm',no:'Refuse'},
                ru:{confirmQuestion:`Позволить ${parent} быть вашим родителем?`,
                    yes:'Подтвердить',no:'Отказаться'}}   
    return (
<View style={styles.body}>
  <Text style={styles.text}>
      {obj[lang].confirmQuestion}
  </Text>
  <View style={styles.buttonBlock}>
      
          <Button icon='check-circle'mode='contained'
            onPress={()=>{
                 dispatch({type:'status',
                 status:'baby' })
                              }}>
                  {obj[lang].yes}
          </Button>     
          <Button icon='cancel'mode='outlined'color='red'
           onPress={async()=>{
                                 await SecureStore.setItemAsync('parentToken','')
                                  dispatch({type:'status',status:'babyPanding'})
                                  dispatch({type:'parent',parent:''})
                              }}> 
                  {obj[lang].no}
            </Button>
      
  
  </View>
</View>
    )
}
const deviceW = Dimensions.get('window').width
const styles = StyleSheet.create({
    body:{flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    text:{
        fontSize:14,
        color:'#666',
        textAlign:'center',
        marginHorizontal:10,
    },
    buttonBlock:{
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        
        height:300
    },
    
    button:{
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        borderRadius:20,
        height:40,
        width:deviceW* 0.65,
        backgroundColor:'blue',
        
        
    },
    buttonText:{
        color:'#e6e6e6',
        fontSize:14,
        textAlign:'center'

    }
})