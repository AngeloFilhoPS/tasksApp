import React, {Component} from 'react'
import {View,Text, ImageBackground,StyleSheet,StatusBar,FlatList,TouchableOpacity,Platform,} from 'react-native'
import moment from "moment";
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from "../commonStyles";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/FontAwesome";


export default class TaskList extends Component{
    state ={
        showDoneTasks: true,
        visibleTasks:[],
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

    componentDidMount=()=> {
        this.filterTask()
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
        console.log(visibleTasks)
        this.setState({visibleTasks})
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

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(

            <View style={styles.container}>
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
    },
    iconBar:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'flex-end',
        marginTop: Platform.OS==='ios' ? 40:10
    }
})
