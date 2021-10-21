import * as SecureStore from 'expo-secure-store'
const tokenJson = SecureStore.getItemAsync('token')
   const tokenFromStore = tokenJson&&tokenJson.length&&tokenJson.length>5?JSON.parse(tokenJson):undefined 
 
const  initialState={lang:'eng',isHeaderOpen:false,status:'start',location:{},
      password:'', email:'',isParentFetching:false,babyInfo:false,babyPass:'',
      token:tokenFromStore,routName:'Start',isFetching:false}

export default function Reducer(state=initialState,action){
    switch(action.type){
      case 'routName':
          return {...state,routName:action.routName}  
      case 'drop':
          return {...state,...initialState}  
      case 'token':
          return {...state,token:action.token}  
      case 'parent':
          return {...state,parent:action.parent}  
      case 'babyPass':  
          return {...state,babyPass:action.babyPass,babyToken:action.babyToken}
      case 'babyInfo' :
          
          return {...state,babyInfo:action.babyInfo}  
      case 'isParentFetching'  :
          return {...state,isParentFetching:action.isParentFetching}
      case 'lang':
          const carrentLang = state.lang==='eng'?'ru':'eng'
          return {...state,lang:carrentLang}
      case 'IS_HEADER_OPEN':
              
          return {...state,isHeaderOpen:!state.isHeaderOpen}   
      case 'status':
         return {...state,status:action.status}     
    
      case 'registration':
         // console.log('registration start')
          return {...state,password:action.password,
                  status:action.status}
      case 'IS_FETCHING':
          return {...state,isFetching:action.payload}            
    default :
         return state              
}
                                       }