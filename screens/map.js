import * as React from 'react'
import {View,StyleSheet,TouchableOpacity,Dimensions,Text} from 'react-native'
import MapView,{Polyline,Marker} from 'react-native-maps'
import {useDispatch,useSelector} from 'react-redux'
import * as Location from 'expo-location'
import * as SecureStore from 'expo-secure-store'
import Header from '../components/Header'
const langObj = {eng:{get:'Get location',wate:'wating child'},
ru:{get:'получить координаты',wate:'oжидаем ребенка'}}
export default function Map(){
    const colors = ['red','blue','green','yellow']
    const dispatch = useDispatch()
    const isParentFetching = useSelector((state)=>{
        return state.isParentFetching
    })
    const lang = useSelector((state)=>{
        return state.lang
    })
    const location = useSelector((state)=>{
        return state.location
    })
    //let parentLocation = !locationJson&&await Location.getCurrentPositionAsync({});
    
    
    let token = useSelector((state)=>{
        return state.babyToken
    })
    const [carentLoc,setCarentLoc] = React.useState(location&&
        location.length?location[location.length-1]:{})
    let values = Object.values(carentLoc)    
    const getLoc = async()=>{try{
        dispatch({type:'isParentFetching',isParentFetching:true})                          
        
                                      
                const message = {
                                to: token,
                                title: '',
                                body: '',
                                data: {type:'location' } ,                                    
                                _displayInForeground: false,
                                        };
                 fetch('https://exp.host/--/api/v2/push/send', {
                     method: 'POST',
                     headers: {
                     Accept: 'application/json',
                       'Accept-encoding': 'gzip, deflate',
                       'Content-Type': 'application/json',
                                          },
                      body: JSON.stringify(message),
                                        });                                        
                                  }catch(error){
                                      console.log(error)}
                                  }
     return (
        <View style={styles.body}>
          <Header/>  
          <MapView style={styles.map}>
                          
            <Polyline coordinates={values}
                      strokeColor={colors[0]} />                     
          </MapView> 
            <TouchableOpacity   style={styles.btn}
            onPress={()=>getLoc()}>
             <View style={styles.buttonView}>
           
                <Text style={styles.buttonText}>
                    {isParentFetching?langObj[lang].wate:
                    langObj[lang].get}
                </Text></View>
                </TouchableOpacity>
           
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
    map:{
        width:deviceW,
        height:deviceH*0.7,
        
    },
    btn:{
        zIndex:9000,
        position:'absolute',
        top:deviceH*0.6,
        right:60,

    },
    buttonView:{
        height:40,
        width:150,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        zIndex:9000,
        borderColor:'#e1e9e1',
        backgroundColor:'rgba(220,220,220,0.6)',
        borderWidth: 0
    },
    buttonText:{
        fontSize:14,
        color:'blue',
        textAlign:'center'
    }
})