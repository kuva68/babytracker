import * as React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import AppFile from './Appfile'
import Reducer from './components/Reducer'
import {Provider as PaperProvider} from 'react-native-paper'

export default function App(){
    const store = createStore(Reducer)
    return <Provider store = {store}>
         <PaperProvider>
         <AppFile/>
         </PaperProvider>
         </Provider>
}