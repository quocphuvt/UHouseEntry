import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Swipeout from 'react-native-swipeout'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Dialog from "react-native-dialog";

const DialogEntry = (props) =>{
    const {title,money,date,dateStart,reason,_key,indexItem,listenerForItem,visible} = props
    return(
        <View>
            <Dialog.Container visible = {visible}>
                <Dialog.Title style={{backgroundColor: "#43689e",padding:5}}>
                    <Text style ={{color : "white"}}>{title}</Text>
                </Dialog.Title>
                    <Dialog.Description style={{marginLeft:3}}>
                        <Icon name ="dollar" color = "#bababa" size = {20} />
                        <Text style ={styles.textTitle}>Money: </Text>
                        <Text style ={styles.text}>{money}</Text>
                    </Dialog.Description>
                    <Dialog.Description>
                        <Icon name ="calendar" color = "#bababa" size = {20} />
                        <Text style ={styles.textTitle}>Date: </Text>
                        <Text style ={styles.text}>{date}</Text>
                    </Dialog.Description>
                    <Dialog.Description>
                        <Icon name ="calendar" color = "#bababa" size = {20} />
                        <Text style ={styles.textTitle}>Date start: </Text>
                        <Text style ={styles.text}>{dateStart}</Text>
                    </Dialog.Description>
                    <Dialog.Description>
                        <Icon name ="comment" color = "#bababa" size = {20} />
                        <Text style ={styles.textTitle}>Reason: </Text>
                        <Text style ={styles.text}>{reason}</Text>
                    </Dialog.Description>
                    
                    <Dialog.Button label="Cancel" onPress = {()=>props.fetchToggle()} />
                </Dialog.Container>
        </View>
        
       
    )
    
}
export default DialogEntry;
const styles = StyleSheet.create({
    text : {
        color : "#666666",
    },
    textTitle : {
        color : "#666666",
        fontWeight: 'bold',
    }
})
