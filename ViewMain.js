import React, {Component} from 'react'
import {createAppContainer,createBottomTabNavigator} from 'react-navigation'
import ViewEntry from './ViewEntry'
import NewEntry from './NewEntry'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ViewMain = createBottomTabNavigator({
    ViewEntry: {
        screen: ViewEntry,
        title : 'List Entry',
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="list"
                    color={tintColor}
                    size={24}
                />
            ),tabBarLabel: 'Detailed list',
            
        })
    },
    NewEntry: {
        screen: NewEntry,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="edit"
                    color={tintColor}
                    size={24}
                />
            ),tabBarLabel: "Add entry",
        })
    },
},{ 
    header : null,
    swipeEnabled : true,
    animationEnabled : true,
    initialRouteName : 'ViewEntry',
    navigationOptions :{
        tabBarVisible : true
    },
    tabBarOptions : {
        activeTintColor :'#dd6604',
        inactiveTintColor : 'grey'
    },
});

export default createAppContainer(ViewMain);   