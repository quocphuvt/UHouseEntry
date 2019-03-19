import React,{Component} from 'react'
import {View,TouchableOpacity,Text,TextInput,StyleSheet,FlatList,ActivityIndicator,RefreshControl,ScrollView,ListView } from 'react-native'
import {Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ItemEntry from './ItemEntry'
import firebase from "firebase";    
import Dialog from "react-native-dialog";
import DialogEntry from './DialogEntry';

export default class ViewEntry extends Component{
    constructor(props){
        super(props);
        var config = {
            apiKey: "AIzaSyA855aP16GQjDaI-fyAd4QQRg9D3HO1PKM",
            authDomain: "uhouseentry.firebaseapp.com",
            databaseURL: "https://uhouseentry.firebaseio.com",
            storageBucket: "",
          };
        firebase.initializeApp(config);
        this.itemRef = firebase.database();
        this.state = {
            id : "",
            title : "",
            money : 0,
            reason: "",
            date : "",
            dateStart: "",
            entry : [],
            visible : false,
            fetchToggle: true,
            refreshing : false,
            // dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 != r2}),  //Dùng cho listview
        }
    }
    
    componentDidMount(){
          this.listenerForItem(this.itemRef);
    }
    listenerForItem = (itemRef)=>{ //Hàm set dữ liệu
            var items = []
            this.itemRef.ref('entry/').on('child_added',(snapshot)=>{
                    items.push({
                        title : snapshot.val().title,
                        money : snapshot.val().money,
                        date : snapshot.val().date,
                        reason : snapshot.val().reason,
                        dateStart : snapshot.val().dateStart,
                        _key : snapshot.key, //Get key
                    })
                    var itemsCV = Object.entries(items).map(item => ({...item[1],key : item[0]})); //Convert JSON firebase to Array Object because data Flatlist is Array
                    this.setState({entry : itemsCV}); //item[1] Arrays/Array(2)/node 0 & 1 //////key : add string to object[]
                    console.log(itemsCV);
            });      
    }
    _refresh = ()=>{
        this.setState({refreshing : true});   
        this.listenerForItem(this.itemRef);    
        setTimeout(() => {          
            this.setState({refreshing : false});  
        }, 1000);
    }
    fetchToggle=()=>{
        this.setState({
         visible:!this.state.visible,
        })
    }
    render(){
        return(
            <ScrollView refreshControl = {
                <RefreshControl 
                refreshing  ={this.state.refreshing}
                onRefresh = {()=>{this._refresh()}}
            />
            } style = {styles.container}>          
            {this.state.entry.length==0 ? <ActivityIndicator size = 'large' /> : null}          
                <FlatList 
                    data = {this.state.entry}
                    renderItem = {({item,index})=><ItemEntry {...item} indexItem = {index} listenerForItem = {this.listenerForItem} 
                    fetchToggle={this.fetchToggle} 
                    dialogEntry = {this.refs.dialogEntry}  
                    _onClick = {()=>this.setState(
                        {
                            title : item.title,
                            money : item.money,
                            reason : item.reason,
                            date : item.date,
                            dateStart : item.dateStart,
                        })}
                    />}
                />
                <DialogEntry visible = {this.state.visible} fetchToggle={this.fetchToggle} title = {this.state.title} money = {this.state.money}
                    date = {this.state.date} dateStart = {this.state.dateStart} reason = {this.state.reason}
                /> 
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: "#2F3440",
    }, 
    button : {
        marginTop: 10,
        height: 50,
        backgroundColor: "#e8894a",
        justifyContent : 'center',
        alignItems : 'center'
    }
})