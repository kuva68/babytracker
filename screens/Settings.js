import * as React from 'react'
import {List,Button,Portal,Dialog,Paragraph,Menu} from 'react-native-paper'
import {CommonActions} from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Modal,TextInput} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Header from '../components/Header'
import ParentRequest from './parentRequest'
const W = Dimensions.get('window').width

const langObj = {eng:{changeStatus:'Change status',babyPass:'children password',
                      modalPassInfo:'Enter password',
                      cancel:'Cancel',showPass:'Show children password',
                      dropStatus:'Drop status',
                      dropingPassQuestion:'Drop app status and remove all data ?'},
                 ru:{changeStatus:'Изменить статус',babyPass:'пароль ребенка',
                      cancel:'Отмена',showPass:'Показать пароль ребенка',
                      dropStatus:'Сбросить статус',
                      modalPassInfo:'Введите пароль',
                      dropingPassQuestion:'Сбросить статус приложения и удалить все данные ?'}}
export default function Settings({navigation}){
    const dispatch = useDispatch()
    const status = useSelector((state)=>{
        return state.status
    })
    const password = useSelector((state)=>{
        return state.password
    })
    const babyPass = useSelector((state)=>{
        return state.babyPass
    })
    const [showPass,setShowPass] = React.useState(false)
    const [isPasModal,setIsPasModal] = React.useState(false)
    const [pass,setPass] = React.useState('')
    const [isPassDropingVisible,setIsPassDropingVisible] = 
    React.useState(false)
    const lang = useSelector((state)=>{
        return state.lang
    })
    const showDropModal = ()=>setIsPasModal(true)
    const showChildPass = ()=>setShowPass(true)
     return (
<View style={styles.body}>
    <Header/>
 <List.Item onPress={showDropModal}
  style={{height:100}}
  left={()=><List.Icon icon='logout'/>}
  title={
     langObj[lang].changeStatus
 }/>
 {status==='parent'&&(
 <List.Item left={()=><List.Icon icon='eye'/>}
            onPress={showChildPass}
            style={{height:100}}
                      
            title={langObj[lang].showPass}/>)}
<Portal>                      
<Dialog visible={showPass}>
<Dialog.Title>{langObj[lang].babyPass}</Dialog.Title>   
 <Dialog.Content>
<Paragraph>{babyPass}</Paragraph>
 </Dialog.Content>
 <Dialog.Actions>
     <Button onPress={()=>{setShowPass(false)}}>
         OK
     </Button>
 </Dialog.Actions>
</Dialog>     
</Portal>                 
<Modal visible={isPasModal}>

       <View style={styles.modalView}>
{ status !== 'baby' && status !== 'babyPanding' || 
isPassDropingVisible?(      
          <View style={styles.passDropingView}>
                <Text style={{marginTop:40,marginHorizontal:20,
                fontSize:16,textAlign:'center'}}>
                  {langObj[lang].dropingPassQuestion}
                </Text>
                <Button icon='logout'mode='contained'
                    style={{width:'90%',marginVertical:70,height:50}}
                    onPress={async()=>{
                        dispatch({type:'drop'})
                        setIsPasModal(false)
                        await SecureStore.setItemAsync('location','')
                        await SecureStore.setItemAsync('parentToken','')
                        navigation.dispatch(CommonActions.reset({
                            index:0,
                            routes:[
                                {name:'Start'}
                            ]
                        }))
                    }}>{langObj[lang].dropStatus}</Button>
                <Button icon='cancel'mode='outlined'
                   onPress={()=>{
                       setIsPasModal(false)
                   }} >{langObj[lang].cancel}</Button>   
                    
                
         </View>):
    (<View style={styles.passView} >
      <Text style={styles.modalText}>
       {langObj[lang].modalPassInfo}
      </Text>
      <TextInput onChangeText={(text)=>setPass(text)}
              value={pass}style={styles.modalPassInput}/>
      <TouchableOpacity onPress={()=>{
        pass === password&&
         setIsPassDropingVisible(true)
         setPass('')}} >
        <View style={styles.modalBtn}>
            <Text style={styles.modalBtnText}>
                Submit
            </Text>
        </View>
      </TouchableOpacity>   
      <Button onPress={()=>{setIsPasModal(false)}}>
          {langObj[lang].cancel}
          </Button>    
    </View>      )
         }          
       </View>
   </Modal>
</View>
    )
}
const H = Dimensions.get('window').height
const styles = StyleSheet.create({
   body:{
       width:'100%',
       minHeight:H
   }  ,
   settingsView:{
       marginTop:10,
       flex:1,
       
   },
   info:{
       fontSize:12,
       color:'#666'
   },
   touchView:{
       
       width:W,
       height:50,
       backgroundColor:'blue',
       borderBottomColor:'#e6e6e6',
       borderBottomWidth:1,

   },
   touchText:{
       color:'#e6e6e6',
       fontSize:14,
       textAlign:'center'
   },
   passDropingView:{
       justifyContent:'space-around',
       alignItems:'center',
   },
   passView:{
       width:'100%',
       justifyContent:'space-around',
       alignItems:'center',
       backgroundColor:'#e6e6e6',
       height:H
   },
   modalBtn:{
       width:0.6*W,
       height:40,
       borderRadius:20,
       borderWidth:1,
       backgroundColor:'blue',
       justifyContent:'center',
       alignItems:'center'

   },
   modalBtnText:{
       color:'white',
       fontSize:20
   },
   modalPassInput:{
       width:'80%',
       height:40,
       borderRadius:20,
       borderWidth:1,
       borderColor:'#666',
       justifyContent:'center',
       alignItems:'center',
       textAlign:'center',
   }
})