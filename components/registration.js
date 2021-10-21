import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,
    Clipboard,Dimensions,Modal,Alert} from 'react-native'
import * as React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as SecureStore from 'expo-secure-store'

const deviceW = Dimensions.get('window').width

 export default function Registration(){  
     
      const dispatch = useDispatch() 
    const babyInfo = useSelector((state)=>{
        return state.babyInfo
    })
   const token = useSelector((state)=>{
       return state.token
   })
   const lang = useSelector((state)=>{
       return state.lang
   }) 
    langObj = {eng:{email:'email',pasword:'password 6 characters',plEmail:'enter your email',
        alertTitle:'Attention',alertMessage:'Fill in the fild "email" correctly',
        alertPas1:'Password field must contain at least 6 characters',
        alertPas2:'Passwords must be the same',
        passwordAlert:'enter same password',submit:'copy data and submit',watingOfer:
               'Waiting parent',baby:'Children',infoMessage:"Fill in all the fields, click the 'Sabmit' button, now all the necessary information is copied to the clipboard. Open any messenger, press and hold in the text box until the context menu appears. Then click on the 'paste' label, send a message to the parent’s phone .Then open the message on the parent’s phone, press and hold it until the context menu appears. Select the 'copy' shortcut and press. Now on the parent’s phone, in the program on the registration page, click the 'paste child data ' "},
        ru:{email:'почта',pasword:'пароль 6 знаков',plEmail:'введите адрес эл.почты',
        alertMessage:'Заполните правильно поле "email"',alertPass1:'Поле "пароль" должно содержать не менее 6 знаков',
            passwordAlert:'не правильно введен пароль',baby:'Ребонок',alertTitle:'Внимание',
            alertPas2:'Пароли должны быть одинаковые',
               submit:'Копировать данные ',watingOfer:'Ожидаем родителя',
            infoMessage:"Заполните все поля , нажмите кнопку 'Sabmit', теперь вся необходимая информация скопирована в буфер обмена . Откройте любой месенджер , в поле для ввода текста нажмите и удерживайте пока не появится контекстное меню. Затем нажмите на ярлык 'вставить' , отправьте сообщение на телефон родителя. Затем на телефоне родителя откройте сообщение , нажмите на него и удерживайте пока не появится контекстное меню . Выберите ярлык 'копировать' и нажмите . Теперь на телефоне родителя , в программе на странице регистрации нажмите кнопку 'вставить данные ребенка'"}}
    
        
        const [password1,setPasword1] = React.useState('')     
        const [password2,setPasword2] = React.useState('')   
        const submit = ()=>{
             if(password1.length<=5){Alert.alert(langObj[lang].alertTitle,
                langObj[lang].alertPas1)}else if(password2!==password1){
                    Alert.alert(langObj[lang].alertTitle,langObj[lang].alertPas2)
                }else{
                 dispatch({type:'registration',password:password1,
                  status:'babyPanding'})
                 Clipboard.setString(`${password1},${token}`)
               //  console.log('clipboard',`${password1},${token}`)
                 
                 setPasword1('')
                 setPasword2('')
                 }}
         
       
       return(
        <ScrollView contentContainerStyle={styles.scrollview}>
        <TextInput style={{...styles.input,color:password1&&
                               password1.length>5?'#666':'red',
                            textDecorationLine:password1&&
                            password1.length>5?'none':'underline'}}
                   placeholder={langObj[lang].pasword}
                   value = {password1}
                   onChangeText={(e)=>{
                       setPasword1(e)
                   }}/>
        <TextInput style={{...styles.input,color:password2===
                            password1?'#666':'red',
                            textDecorationLine:password1===password2?
                            'none':'underline'}}
                   placeholder={langObj[lang].pasword}
                   value={password2}
                   onChangeText={(e)=>{
                       setPasword2(e)
                   }}/>
      
            <TouchableOpacity   onPress={submit}>
  
               <View style={{...styles.button,opacity:password1!==''&&
                      password1.length>5&&password2===password1?
                      1:0.1}}>

                  <Text style={styles.buttonText}>
                    {langObj[lang].submit}
                  </Text>
                </View>
            </TouchableOpacity>
    
                                 
<Modal animationType='slide'transparent={false}visible={babyInfo}>
         <View style={styles.modal}>
              <Text style={styles.infoMessage}>
                 {langObj[lang].infoMessage}
              </Text>
                 <TouchableOpacity onPress={()=>{
                                      dispatch({type:'babyInfo',
                                                babyInfo:false})
                 }}>
                    <View>
                        <Text style={styles.infoMessageClose}>
                            Close
                        </Text> 
                    </View>
                 </TouchableOpacity>
    
           </View></Modal>
           
       
            <TouchableOpacity   onPress={()=>{
                                   // console.log('babyInfo before',babyInfo)
                                    dispatch({type:'babyInfo',babyInfo:true})
                                }}>
                <View style={styles.babyInfoButton}>                
                <Text style={styles.babyInfoButtonText}>
                    i
                </Text></View>
            </TouchableOpacity>

        
    </ScrollView>)

    }
  

const deviceH = Dimensions.get('window').height
const styles = StyleSheet.create({
      scrollview:{
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        minHeight: deviceH,
        paddingBottom: 80
        
    }    , 
    modal:{
        flexDirection:'column',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        }     ,
    input:{
        fontSize:16,
        height:30,
        borderRightColor:'#666',
        borderWidth:1,
        width:'70%',
    
        borderRadius:15,
        alignItems:'center',
        textAlign:'center'
    },
    alertView:{
        height:30,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    alertText:{fontSize:12,
               textAlign:'center',
               color:'red',
               textShadowColor:'red',
               marginLeft:10
    },
    button:{
        width:deviceW*0.7,
        height:50,
        backgroundColor:'blue',
        borderRadius:25,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'

    },
    highlite:{
        flexGrow:1
    },
    buttonText:{
        color:'#e7e7e7',
        textShadowColor:'#666',
        fontSize:14
    },
    babyInfoButton:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    babyInfoButtonText:{
        fontSize:20,
        color:'blue',
        textAlign:'center',
        fontWeight: 'bold'
    },
    infoMessageClose:{
        color:'blue',
        fontSize:16
    },
    infoMessage:{
        marginHorizontal:20,
        marginBottom: 30

    }

})