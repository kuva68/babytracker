import * as React from 'react'
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Modal,
    TouchableWithoutFeedback,Clipboard,Dimensions,
     KeyboardAvoidingView} from 'react-native'
import * as SecureStore from 'expo-secure-store'       
import {useSelector,useDispatch} from 'react-redux'
import Header from '../components/Header'
import { StackActions } from '@react-navigation/native';



const langObj = {eng:{nicValue:'Enter child code',parent:'You name',
parentInfo:'If you receive message from child and copy it ,press button bellow ',
requestAlert:'The request has been sent, now on the child’s phone making sure that the request came on your behalf, “click accept”',
close:'Close',buttonText:'Send request',getBabyData:'Save child data',requestAlertError:
'Error, first copy the message from the child',sendName:'Now children password saved on your phone , you can find it in settings , next send request with your name to your child'},
                 ru:{nicValue:'Введите код ребенка',parent:'Ваше имя',
                     close:'Закрыть',parentInfo:
                     'Если вы получили сообщение от ребенка и скопировали его , нажмите кнопку ниже',
                     requestAlert:'Запрос был отправлен , теперь на телефоне ребенка убедившись что запрос пришел от вашего имени , "нажмите принять"',
                     buttonText:'Отправить запрос',getBabyData:'Сохранить данные ребенка',
                    requestAlertError:
                'Ошибка ! Сначала необходимо скопировать сообщение от ребенка',sendName:
            'Теперь пароль ребенка сохранен на вашем телефоне , вы можете его найти в настройках , сейчас вы можете отправить запрос ребенку с вашим именем.'}}
export default function ParentRequest({navigation}){
    const dispatch = useDispatch()
    const lang = useSelector((state)=>{
        return state.lang
    })
    const statePass = useSelector((state)=>{
        return state.babyPass
    })
    const stateBabyToken = useSelector((state)=>{
        return state.babyToken
    })
    console.log(statePass,': statePass',stateBabyToken,': stateBabytoken===')
   const [isModalVisible,setIsModalVisible] = React.useState(false) 
   const [isModalVisible1,setIsModalVisible1] = React.useState(false)
   const [isFetchBaby,setIsFetchBaby] = React.useState(false)
   const getDataFromClipboard = async()=>{ try{
       let data = await Clipboard.getString()  
       let pass = data.split(',')[0]
       !pass&&setIsModalVisible1(true)
       let babyToken = data.split(',')[1]
       !babyToken&&setIsModalVisible1(true)
       if(!babyToken||!pass){return}else{
           console.log('from clipBoard',pass,babyToken)
           dispatch({type:'babyPass',babyPass:pass,babyToken:babyToken})

   }}catch(error){console.log(error)}
}
React.useEffect(()=>{
    const fetchBaby =async()=>{try{
                                          
        const message = {
          to: stateBabyToken,
          data: {type:'parentRequest',
                 parent:parentName,
                 token: token}    ,     
          _displayInForeground: false,
          };
         
        let resp = await fetch('https://exp.host/--/api/v2/push/send', {
           method: 'POST',
           headers: {
           Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
                                                },
           body: JSON.stringify(message)
                                                    });   
     
              //resp && console.log(resp,'resp =====')   
           setIsFetchBaby(false)                                                                        
           
           setIsModalVisible(true)                          
        } catch(error){console.log(error)}
     
     }
     isFetchBaby && stateBabyToken && fetchBaby()
},[isFetchBaby,stateBabyToken])
   
    
    const [parentName,setParentName] = React.useState('')
    const token = useSelector((state)=>{return state.token} )
    return ( <View style={styles.body}>
    <Header/>
            <KeyboardAvoidingView style={styles.requestBody}
            behavior='height'>
                <Text style={{marginHorizontal:15}}>
                    {langObj[lang].parentInfo}
                </Text>
             <TouchableOpacity style={styles.touchable}
                        onPress={()=>{getDataFromClipboard()}}>
                 <View style={styles.button}>
                     <Text style={styles.buttontext}>
                         {langObj[lang].getBabyData}  
                     </Text>
                 </View>
             </TouchableOpacity>
            
             <Text style={{marginHorizontal:10}}>
                 {statePass&&stateBabyToken&&langObj[lang].sendName}
             </Text>
                 <TextInput style={styles.textInput}
                           value={parentName}
                           onChangeText={(text)=>{
                               setParentName(text)
                           }}   
                           placeholder={langObj[lang].parent} />
                
                <TouchableOpacity style={styles.touchable}
                        onPress={()=>{!statePass||!stateBabyToken?
                            setIsModalVisible1(true): setIsFetchBaby(true)}}>
                 <View style={styles.button}>
                     <Text style={styles.buttontext}>
                         {langObj[lang].buttonText}  
                     </Text>
                 </View>
             </TouchableOpacity>
                
            </KeyboardAvoidingView>
            <Modal visible={isModalVisible1}
                animationType='fade'
                transparent={false}>
                    <View style={styles.modalView}>
                   <Text style={styles.modalText}>
                       {langObj[lang].requestAlertError}
                   </Text>
                   <TouchableWithoutFeedback onPress={()=>{
                       setIsModalVisible1(false)
                       

                   }}>
                       <Text style={styles.modalCloseText}>
                           {langObj[lang].close}
                       </Text>
                   </TouchableWithoutFeedback>
               </View>
               
                </Modal>
           <Modal visible={isModalVisible}
                  animationType='fade' transparent={false} >
               <View style={styles.modalView}>
                   <Text style={styles.modalText}>
                       {langObj[lang].requestAlert}
                   </Text>
                   <TouchableWithoutFeedback onPress={()=>{
                       setIsModalVisible(false)
                       navigation.dispatch(StackActions.replace('Map'))

                   }}>
                       <Text style={styles.modalCloseText}>
                           {langObj[lang].close}
                       </Text>
                   </TouchableWithoutFeedback>
               </View>
               </Modal> 
        </View>
    )
}
const deviceW = Dimensions.get('window').width
const deviceH = Dimensions.get('window').height
const styles = StyleSheet.create({
    body:{
        width:deviceW,
        minHeight:deviceH
    },
    requestBody:{
        marginTop: 15,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        width:deviceW,
        
    },
    textInput:{
        width:deviceW*0.8,
        height:40,
        fontSize:14,
        borderColor:'#e7e7e7',
        color:'#666',
        borderRadius:20,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    
    button:{
        width:deviceW * 0.75,
        height:60,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
        
        marginVertical:50
      } ,
      buttontext:{
        fontSize:18,
        color:'#e7e7e7',
        textAlign:'center'
      },
      modalView:{
          justifyContent:'space-around',
          alignItems:'center',
          borderWidth:1,
          borderColor:'#666',
          backgroundColor:'#666',
          borderRadius:20,
          height:deviceH*0.8,
          width:deviceW*0.8,
          marginHorizontal:deviceW*0.1,
          marginVertical:deviceH*0.1
      },
      modalText:{
          fontSize:14,
          color:'#e6e6e6',
          marginHorizontal:20
      },
      modalCloseText:{
          color:'orange',
          fontSize:24
      }
})