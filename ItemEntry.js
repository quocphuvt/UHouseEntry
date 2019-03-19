import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Swipeout from 'react-native-swipeout'
import firebase from 'firebase'
import ViewEntry from './ViewEntry'
import DialogEntry from './DialogEntry.js'
const ItemEntry = (props) =>{
    const {title,_key,dateStart,indexItem,listenerForItem,fetchToggle,dialogEntry,_onClick} = props
    return(
        <Swipeout right = {[
            {
                text : 'Delete',
                backgroundColor: "#ce2929",
                onPress : ()=>{
                    firebase.database().ref("entry/").child(_key).remove();
                    listenerForItem();    
                             
                }
            }
        ]}>
            <TouchableOpacity style = {{backgroundColor : (indexItem % 2 == 0? "#2F3440":"#767a84"),padding: 10}}
                onPress = {()=> {
                    fetchToggle()
                    _onClick();
                }
            }
            >
                <Text style ={{fontWeight : "bold",fontSize: 18,color : (indexItem % 2 == 0? "#eaeaea":"#262626")}}>{title}</Text>
                <Text style ={{marginTop: 5,color : (indexItem % 2 == 0? "#eaeaea":"#262626")}}>{dateStart}</Text>
            </TouchableOpacity>
            <DialogEntry title = {title} />    
        </Swipeout>
        
       
    )
    
}
export default ItemEntry;
