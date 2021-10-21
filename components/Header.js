import * as React from 'react'
import { useNavigation,useNavigationState } from '@react-navigation/native'
import {useSelector,useDispatch} from 'react-redux'
import {View,Text,Animated,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
const deviceW = Dimensions.get('window').width
const deviceH = Dimensions.get('window').height
export default function Header(){
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const navState = useNavigationState((state)=>state)
  const routName = navState.routes[navState.index].name
  console.log(routName,'routName====')
   
    const isHeaderOpen = useSelector((state)=>{
        return state.isHeaderOpen
      })
    const status = useSelector((state)=>{
      return state.status
    })  
    const lang = useSelector((state)=>{
      return state.lang
    })
      const [fadeAnim] = React.useState(new Animated.Value(-150))
  React.useEffect(()=>{
        const open= ()=>{
          Animated.timing(fadeAnim,{
            toValue:0,
            duration:500
          }).start()
        }
        const close = ()=>{
          Animated.timing(fadeAnim,{
            toValue:-150,
            duration:500
          }).start()
        }
        isHeaderOpen===true?open():close()
      },[isHeaderOpen])
        const langObj = {eng:{settings:'Setting',map:'Map',
                              addChild:'Add child',parentRequest:
                            "Parent request"},
                         ru:{settings:'Настройки',map:'Карта',
                             parentRequest:'Запрос родителя',
                             addChild:'Добавить ребенка'}}
        return (
        
            <Animated.View style={{...styles.header,marginTop: fadeAnim}}>
                 {routName!=='Settings'&&status!=='start'&&( <TouchableOpacity   onPress={()=>{
                                        navigation.navigate('Settings')
                                        dispatch({type:'IS_HEADER_OPEN'})
                                     
                                      }}>
                    <View style={styles.li}>             
                    <Text style={styles.text}>
                     {langObj[lang].settings} 
                    </Text>
                    </View>
                  </TouchableOpacity>)}
            
   {status==='parent'&&routName!=='Map'&&(<TouchableOpacity onPress={()=>{
                                        navigation.navigate('Map')
                                        dispatch({type:'IS_HEADER_OPEN'})
                                     
                                      }}>
                    <View style={styles.li}>
                  
                    <Text style={styles.text}>
                     {langObj[lang].map} 
                    </Text>
                    </View>
                  </TouchableOpacity>
            
    ) }
    {(status==='parent'||status==='parentPending')&&routName!=='ParentRequest'&&(
                  <TouchableOpacity   onPress={()=>{
                                        navigation.navigate('ParentRequest')
                                        dispatch({type:'IS_HEADER_OPEN'})
                                     
                                      }}>
                    <View style={styles.li}>
                    <Text style={styles.text}>
                     {langObj[lang].parentRequest} 
                    </Text>
                    </View>
                  </TouchableOpacity>
              
                                    ) }
   
            </Animated.View>
        )     
}
const styles = StyleSheet.create({
  header:{
          backgroundColor:'rgba(50,50,200,0.1)',
          borderBottomColor:'#666',
          borderBottomWidth:1,
          height:150
          },
  li:{
     height: 50,
     width: deviceW,
     backgroundColor: 'rgba(100,100,240,0.5)',
     borderBottomColor: '#666',
     borderBottomWidth:1,
     justifyContent: 'center',
     alignItems:'center'
  }     ,
 
  text:{
    
    color:'#666',
    fontSize: 14,
    textAlign:'left'
  }
})