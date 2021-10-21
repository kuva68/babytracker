import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View,Button,Text,Animated,
         Dimensions} from 'react-native';
//import { SplashScreen } from 'expo';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import * as firebase from 'firebase'
//import * as Location from 'expo-location'
import {useDispatch,useSelector} from 'react-redux'
//import * as TaskManager from 'expo-task-manager'
import Effects from './components/effects'
import {Notifications} from 'expo'  
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store'
import Map from './screens/map'
import HomeScreen from './screens/HomeScreen';
import Baby from './screens/Baby'
import ParentRequest from './screens/parentRequest'
import Settings from './screens/Settings'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const deviceW = Dimensions.get('window').width
//var firebaseConfig = {
 // apiKey: "AIzaSyBScPahvo5NxCEWbP2eOKk_xC9dHY4eCzk",
 // authDomain: "pwa-experiment-c78f9.firebaseapp.com",
 // databaseURL: "https://pwa-experiment-c78f9.firebaseio.com",
 // projectId: "pwa-experiment-c78f9",
 // storageBucket: "pwa-experiment-c78f9.appspot.com",
 // messagingSenderId: "996772557487",
 // appId: "1:996772557487:web:3d01fd34b2fbc390feda5a"
//};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

export default function AppFile() {  
  const dispatch = useDispatch()
  const [isStateUpdated,setStateUpdated] = React.useState(false)
  const Stack = createStackNavigator();
 let lang = useSelector((state)=>{
  return state.lang
})

 const status = useSelector((state)=>{
   return state.status
 })
 console.log(status,'status======')
 const istate = useSelector((state)=>{return state})
 const isHeaderOpen = useSelector((state)=>{
   return state.isHeaderOpen
 })
 
 const [valueX] = React.useState(new Animated.Value(0))
 React.useEffect(()=>{
   const stateFromStore = async()=>{try{
  let stateFromStore =await SecureStore.getItemAsync('state')
  let appState = stateFromStore&&stateFromStore.length&&
      stateFromStore.length>10&&JSON.parse(stateFromStore)
      appState&&dispatch({type:'state',state:appState})
      setStateUpdated(true)
      console.log(appState,'state from store=======')
   }catch(error){console.log(error)}
  }
  !isStateUpdated && stateFromStore()
  return async()=>{
    await SecureStore.setItemAsync('state',JSON.stringify(istate))
  }
 },[isStateUpdated])

 let token = useSelector((state)=>{
  return state.token
})
 React.useEffect(()=>{
    
  async function getToken(){
      //console.log('getToken start')
    const {status:existingStatus} = await Permissions.
        getAsync(Permissions.NOTIFICATIONS)
    console.log('existingStatus:',existingStatus)    
    let finalStatus = existingStatus
    if(existingStatus!=='granted'){
      const status = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
     console.log('finalStatus',finalStatus)
    }    
    if(finalStatus!=='granted'){
      console.log('enable to get permissions')
    }
    let  newToken = await Notifications.getExpoPushTokenAsync();
      console.log('token',newToken)
      newToken&&dispatch({type:'token',token:newToken})
    //newToken&&SecureStore.setItemAsync('token',JSON.stringify(newToken))  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: false,
        
        });
    }
    }
  if(isStateUpdated && !token)getToken()
},[token,isStateUpdated])  
React.useEffect(()=>{
isHeaderOpen?animateOut():animate()
},[isHeaderOpen])

  
const animate = ()=>{
  console.log(valueX,'valueX====')
  Animated.timing(valueX,{
    toValue:1,
    duration:500
  }).start()
  
}
const animateOut = ()=>{
  Animated.timing(valueX,{
    toValue:0,
    duration:500
  }).start()
}
  
Effects()


 const HeaderRtBtn = ()=>{
  return (<View style={styles.headerRight}>
<TouchableWithoutFeedback onPress={()=>{
                         dispatch({type:'lang'})
    }}>
      <Text style={{fontSize: 14,
                   fontWeight:'bold'}}>
                     {lang}
      </Text>
  </TouchableWithoutFeedback>
    <View style={styles.hRightBtn}>
  <TouchableWithoutFeedback style={{flex:1}}
                          onPress={()=>{
                          
                            dispatch({type:'IS_HEADER_OPEN'})
                          }}>
        <View style = {styles.hRtBtnView}>
        <Animated.View style={{...styles.hRightBtnText,
        transform:[{rotateX:valueX.interpolate({
          inputRange : [0,1],
          outputRange : ['0deg','180deg']
        })}
       
      ]
      }}>
        <FontAwesome5 name="caret-square-down" size={34} color="blue" />
      </Animated.View>
          </View>
    </TouchableWithoutFeedback>
    </View>
  </View>)
}


    return (
    
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer  >
          <Stack.Navigator initialRouteName={()=>{
           return status==='start'?'Start':status==='parentPending'?'ParentRequest':
            status==='Parent'?'Map':'Baby'
          }}
         // {
           // status==='start'?'Start':status==='parentPending'?
           //'ParentRequest':status==='parent'?'Map':'Child' }
                       screenOptions={{
                        
                             headerTintColor:'blue',
                             backgroundColor:'#e7e7e7'
                           }   }   
                               >              
            <Stack.Screen name='Start'component={HomeScreen}
                          headerBackTitleVisible={false}
                          options={{title:'Choose mode',
                          }}/>
            <Stack.Screen name='Settings'component={Settings}
                      options={{title:'Settings',
                      headerRight:()=><HeaderRtBtn/>}}    />   
            <Stack.Screen name='ParentRequest'component={ParentRequest}
                      options={{title:'Request',
                      headerRight:()=><HeaderRtBtn/>}}    />         
            <Stack.Screen name='Baby'component={Baby}
                      options={{title:'Child',
                      headerRight:()=><HeaderRtBtn/>}}    /> 
            <Stack.Screen name='Map'component={Map}
                      options={{title:'Map',
                      headerRight:()=><HeaderRtBtn/>}}    /> 
           </Stack.Navigator>
        </NavigationContainer>
      </View>
    
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRight:{
    width:deviceW * 0.4,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    

  },
  hRightBtn:{
    
    justifyContent:'center',
    alignItems:'center',
    width:40,
    height:35,
   },
  hRightBtnText:{
    position:'absolute',
    left:0,
    top:0
  },
  hRtBtnView:{
    width:35,
    height:35,

    }
});
