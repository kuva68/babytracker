import * as React from 'react'
import {View,Text,TouchableHighLight,StyleSheet} from 'react-native'

export default function StartScreen(){
    return (
        <View style={styles.body}>
            <View style={styles.button}>
                <TouchableHighLight style={{flex:1}}>
                    <Text style={styles.buttonText}>
                        parent
                    </Text>
                </TouchableHighLight>
            </View>
        </View>
    )
}

const styles = styles.create({
      body:{flex:1,
            backgroundColor: '#e7e8e9'},
      button:{
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: 'black',
          borderColor: '#666',
          borderWidth: 1
      },
      buttonText:{
          fontSize: 16,
          color: '#e7e8e9'
      }

})