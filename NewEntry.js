import React,{Component} from 'react'
import {View,TouchableOpacity,Text,TextInput,StyleSheet,ActivityIndicator} from 'react-native'
import {Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import DatePicker from 'react-native-datepicker'
import firebase from "firebase"
import ViewEntry from "./ViewEntry"

export default class NewEntry extends Component{
    constructor(props){
        super(props);
        // viewentry = new ViewEntry();  
        this.state = {
            id : "",
            title : "",
            money : 0,
            reason: "",
            date : "",
            dateStart: "",
            indicator : false,
        }
    }
    // callFunctionFromViewEntry = () =>{
    //     viewentry.loopRefreshData(); //Calling function from another class
    // }
    onSubmit = (title,money,date,reason)=>{
        
        if(title==""){
            alert('Please input title...');
        }else if(money == 0){
            alert('Money must than 0...');
        }
        else if(isNaN(money)){
            alert('Money should be number...');
        }else if(reason == ""){
            alert('Please input your reason...');
        }
        else {
            this.setState({indicator : !this.state.indicator});
            this.setState({id: Math.floor(Date.now()/1000)});   
            const newEntry ={
                id : this.state.id,
                title : this.state.title,
                money : this.state.money,
                date : this.state.date,
                reason : this.state.reason,
                dateStart : this.state.dateStart,
            }
            firebase.database().ref('entry/'+this.state.id).set(newEntry).then(()=>{
                this.setState({indicator : !this.state.indicator});
                alert('Successfully!');       
                // this.callFunctionFromViewEntry();
                this.resetText();               
            }).catch((error)=>{
                alert(`${error}`);
            })

           
        }
    }
    resetText=()=>{
        this.setState({
            title : "",
            money : 0,
            reason : ""
        })
    }
    // componentWillMount(){
    //     var config = {
    //         apiKey: "AIzaSyA855aP16GQjDaI-fyAd4QQRg9D3HO1PKM",
    //         authDomain: "uhouseentry.firebaseapp.com",
    //         databaseURL: "https://uhouseentry.firebaseio.com",
    //         storageBucket: "",
    //       };
    //       firebase.initializeApp(config);
    // }
    componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
          //Setting the value of the date time
          date:
            date + '-' + month + '-' + year,    
            id : Math.floor(Date.now()/1000),
            dateStart : date + '-' + month + '-' + year + " "+hours + ":"+ min + ":" +sec,
        });
      }
    render(){
        return(
            <View style = {styles.container}>
            {this.state.indicator?<ActivityIndicator animating ={true} size="large" /> : null }          
            <View style = {styles.input}>
                <Input
                            placeholder='Title...'
                            value = {this.state.title}
                            placeholderTextColor = '#f2f2f2'
                            onChangeText = {(text)=>this.setState({title : text})}
                            inputStyle = {{color:'white'}}
                            leftIcon={
                                <Icon
                                name='edit'
                                size={24}
                                color='#f2f2f2'
                                />}
                            />
            </View>
            <View style = {styles.input}>
                <Input
                            placeholder='Money...'
                            value = {this.state.money}
                            placeholderTextColor = '#f2f2f2'
                            onChangeText = {(text)=>this.setState({money : text})}
                            inputStyle = {{color:'white'}}
                            leftIcon={
                                <Icon
                                name='dollar'
                                size={24}
                                color='#f2f2f2'
                                />}
                            />
            </View>  
            <View style ={{flexDirection: "row",height:50,color : 'white',marginTop:15,backgroundColor : 'rgba(234, 234, 234, 0.1)',justifyContent:'space-between'}}>
                <Text style ={{color : 'white', fontSize:18,marginLeft:25,alignSelf: 'center'}}>{this.state.date}</Text>
                <DatePicker
                    style ={{marginTop: 5,}}
                    mode="date"
                    placeholder="Select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2019"
                    maxDate="01-01-2100"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 5,
                        marginLeft: 0,
                    },
                    dateInput: {
                        marginRight: 36,
                        
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>
            <View style = {styles.input}>
                <Input
                            placeholder='Reason...'
                            value = {this.state.reason}
                            placeholderTextColor = '#f2f2f2'
                            multiline = {true}
                            numberOfLines = {5}
                            onChangeText = {(text)=>this.setState({reason : text})}
                            inputStyle = {{color:'white'}}
                            leftIcon={
                                <Icon
                                name='comment'
                                size={24}
                                color='#f2f2f2'
                                />}
                            />
            </View>  
            
            <TouchableOpacity style = {styles.button} onPress = {()=>{
                this.onSubmit(this.state.title,this.state.money,this.state.date,this.state.reason)
                }}>
                    <Text style ={{color: 'white',fontWeight:'bold',fontSize:18}}>Submit</Text>
            </TouchableOpacity>
            
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: "#2F3440",
    },
    input : {
        color : 'white',      
        marginTop:15,
        backgroundColor : 'rgba(234, 234, 234, 0.1)'
    },
    picker : {
        alignSelf : 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button : {
        marginTop: 10,
        height: 50,
        backgroundColor: "#e8894a",
        justifyContent : 'center',
        alignItems : 'center'
    }
})