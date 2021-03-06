import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import 'moment/locale/pt-br'
import Icon from "react-native-vector-icons/FontAwesome";

import Task from "../components/Task";
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from "../commonStyles";
import AddTask from "./AddTask";

const initialState ={
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    task: []
}

export default class TaskList extends Component{
    state ={
        ...initialState
    }

    componentDidMount= async()=> {
        const stateString = await AsyncStorage.getItem('taskState')
        const state = JSON.parse(stateString) || initialState

        this.setState(state,this.filterTask)
    }

    toggleFilter = () =>{
        this.setState({showDoneTasks:!this.state.showDoneTasks},this.filterTask)

    }

    filterTask = ()=>{
        let visibleTasks = []
        if(this.state.showDoneTasks){
        visibleTasks=[...this.state.task]
        }else {
            const pending = task => task.doneAt ===null
            visibleTasks = this.state.task.filter(pending)

        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('taskState',JSON.stringify(this.state ))
    }

    toggleTask = taskId =>{
        const tasks = [...this.state.task]
        tasks.forEach(task=>{
            if(task.id===taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({tasks},this.filterTask)
    }
    addTask=newTask=>{
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert("Dados inválidos","Descrição não informada")
            return
            }
        const task = [...this.state.task]
        task.push({
            id:Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({task,showAddTask:false}, this.filterTask)
    }

    deleteTask = id =>{
        const task = this.state.task.filter(task=>task.id!=id)
        this.setState({task},this.filterTask)
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(

            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                         onSave={this.addTask}
                         onCancel={()=>this.setState({showAddTask:false})}
                />
                <StatusBar backgroundColor="#000"
                           barSyle={"dark-content"}/>

                <ImageBackground style={styles.background} source={todayImage}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks?'eye':'eye-slash'}
                                  size={20} color={commonStyles.color.secondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
              <FlatList
                data={this.state.visibleTasks}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item})=><Task{...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
              />

                </View>
                <TouchableOpacity style={styles.addButton}
                                  activeOpacity={0.7}
                onPress={()=>{this.setState({showAddTask:true})}}>
                    <Icon name='plus' size={20}
                          color={commonStyles.color.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    background:{
        flex: 3
    },
    taskList:{
        flex:7
    },
    titleBar:{
        flex:1,
        justifyContent:'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color:commonStyles.color.secondary,
        fontSize:50,
        marginLeft:20,
        marginBottom:20,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color:commonStyles.color.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'flex-end',
        marginTop: Platform.OS==='ios' ? 40:10
    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor: commonStyles.color.today,
        alignItems:'center',
        justifyContent:'center'
    }
})
