import React, {Component} from 'react'
import {View,Text, ImageBackground,StyleSheet,StatusBar,FlatList} from 'react-native'
import moment from "moment";
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from "../commonStyles";
import Task from "../components/Task";


export default class TaskList extends Component{
    state ={
        task:[{
            id:Math.random(),
            desc:'Comprar Livro',
            estimateAt: new Date(),
            doneAt: new Date(),
        },{
            id:Math.random(),
            desc:'Ler Livro',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }
    toggleTask = taskId =>{
        const tasks = [...this.state.task]
        tasks.forEach(task=>{
            if(task.id===taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({tasks})
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(

            <View style={styles.container}>
                <StatusBar backgroundColor="#000"
                           barSyle={"dark-content"}/>

                <ImageBackground style={styles.background} source={todayImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>

              <FlatList
                data={this.state.task}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item})=><Task{...item} toggleTask={this.toggleTask}/>}
              />

                </View>
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
    }
})
