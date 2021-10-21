import * as React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import {Notifications} from 'expo'  
import * as Permissions from 'expo-permissions'

        
        


export default function Effects(){
  //let tokenJson = SecureStore.getItemAsync('token')
 //let token = tokenJson&&JSON.parse(tokenJson)
  const dispatch = useDispatch()
 const status = useSelector((state)=>{
   return state.status})
  React.useEffect(()=>{
    let locFromStore = []

     let tmpJson = SecureStore.getItemAsync('location')
     console.log(tmpJson,'tmpJson---')
           tmpJson&&tmpJson.length&&tmpJson.length > 10?
           locFromStore = JSON.parse(tmpJson):
           locFromStore = []
   
    const babyLocation = 'babyLocation'
    TaskManager.defineTask(babyLocation,({data,error})=>{
      if(error){console.log('error taskManager',error)} 
      if(data){
        let {locations} = data
        console.log(locations,'locations---------')
        let lastLocations = []
        locations&&locations.forEach((loc)=>{
          if(loc.timeStamp&&loc.coords){
          lastLocations.push({latitude:loc.coords.latitude,
                             timeStamp:loc.timeStamp,
                             longitude:loc.coords.longitude})
        }})
        let today = new Date().toLocaleDateString()
        
       let lastDay = locFromStore.length > 0?
        locFromStore[locFromStore.length -1]:{}

          today in lastDay? lastDay = [...lastDay[today],
          ...lastLocations]:
          lastLocations
         
    let newLocations = []
    console.log(locFromStore.length,'locFromStore.length----')
      locFromStore.length >7?newLocations = locFromStore.slice(locFromStore.length-7):
      locFromStore
      console.log(newLocations,'newLocations------')
    SecureStore.setItemAsync('location',JSON.stringify(newLocations))  
    }})
    async function getLocationAsync() {
      console.log('getLocation start----')
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        console.log('permissons.location granted-----')
        return Location.startLocationUpdatesAsync(babyLocation,{
                 enableHighAccuracy: true, distanceInterval:50,
                timeInterval:60000});
      } else {
        throw new Error('Location permission not granted');
      }
    }
    status==='baby'&&getLocationAsync()
  },[status])
  
  React.useEffect(()=>{
    const registerParent = async(notification)=>{
      try{
        console.log('notification data',notification.data)
      let notif = notification.data
       let type = notif.type
        if(type==='parentRequest'){
          console.log('parentRequest-------')
          let parentToken = notif.parentToken
          parentToken&&await SecureStore.setItemAsync('parentToken',parentToken)
          dispatch({type:'status',status:'getOffer'})
          notif.parent&&dispatch({type:'parent',parent:notif.parent})  
        }
      }catch(error){console.log('error receiving mesage',error)}
    }
    const sendLocation= async()=>{
      console.log('sendLocation start=====')
      EventSubscription.remove(notificationParentSubscription)
      let locationJson =await SecureStore.getItemAsync('location')
      let location = locationJson&&locationJson.length&&
          locationJson.length>10?await JSON.parse(locationJson):undefined
      let tokenJson =await SecureStore.getItemAsync('parentToken')
      let token = tokenJson&&await JSON.parse(tokenJson)
      
        const message = {
          to: token,
          title: '',
          body: '',
          data: {location:location },
          _displayInForeground: false,
        };
        let req = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
        console.log(req,'req push notification to parent')
      
    }
    const parentNotificationReceiver = async(notification)=>{try{
      let data = notification.data
      console.log(data,'data location from child====')
      data&&data.location&&dispatch({type:'location',location:JSON.parse(data.location)})
      dispatch({type:'isParentFetching',isParentFetching:false})
    }catch(error){console.log(error)}
    }
    const babyNotificationSender = (notification)=>{
        let data = notification.data
        data&&data.type&&data.type==='location'&&sendLocation()
    }
    status==='babyPanding'?notificationParentSubscription = 
                  Notifications.addListener(registerParent):
    status==='baby'?babyNotification = Notifications.addListener(
                                   babyNotificationSender):
    status==='parent'?parentNotification = Notifications.addListener(
                                   parentNotificationReceiver()):
             ()=>{EventSubscription.remove(parentNotification)
                 EventSubscription.remove(babyNotification)   }                   
                                   

  },[status])
   
}