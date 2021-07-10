import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import 'moment/locale/pt-br'
import Swipeable from "react-native-gesture-handler/Swipeable";

export default props => {

    const isDoneStyle = props.doneAt != null ?
        {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const getRightContent = ()=>{
        return(
            <TouchableOpacity style={styles.right}
                onPress={()=>{

                    props.onDelete && props.onDelete(props.id)}}>
                <Icon name={"trash"}size={24} color={"#fff"}/>
            </TouchableOpacity>
        )
    }
    const getLeftContent = ()=>{
        return(
            <View style={styles.left}>
                <Icon name={"trash"}size={20} color={"#fff"}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }


    return (
        <Swipeable renderRightActions={getRightContent}
                    renderLeftActions={getLeftContent}
                    onSwipeableLeftOpen={()=> props.onDelete && props.onDelete(props.id)}
        >

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, isDoneStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>


            </View>
        </Swipeable>
    )
}

const getCheckView = (doneAt) => {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name={"check"} size={20} color={'#FFF'}/>
            </View>
        )
    } else {
        return (
            <View style={styles.pedding}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor:"#fff"
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center'
    },
    pedding: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#aaa',
        justifyContent: 'center'
    },
    done: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#04D771',
        backgroundColor: '#04D771'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.subText,
        fontSize: 12,
    },
    right:{
        paddingHorizontal:5,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    left:{
        flex:1,
        backgroundColor:"red",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal: 3
    },
    excludeText:{
        fontFamily:commonStyles.fontFamily,
        color:"#FFF",
        fontSize:20,
        margin:10,
    }
})
