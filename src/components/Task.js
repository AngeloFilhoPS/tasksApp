import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
export default props =>{
    const isDoneStyle = props.doneAt != null ?
        {textDecorationLine:'line-through'}:{}
return(
    <View style={styles.container}>
        <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
        </View>
        <View>
            <Text style={[styles.desc,isDoneStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{props.estimateAt + ""}</Text>
        </View>


    </View>
)
}

const getCheckView = (doneAt)=>{
    if(doneAt!=null) {
        return (
            <View style={styles.done}>
                <Icon name={"check"} size={20} color={'#FFF'}/>
            </View>
        )
    }else {
        return (
            <View style={styles.pedding}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#AAA',
        borderBottomWidth:1,
        alignItems:'center',
        paddingVertical:10,
    },
    checkContainer:{
        width:'20%',
        alignItems: 'center'
    },
    pedding:{
        height:25,
        width: 25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#aaa',
        justifyContent:'center'
    },
    done:{
        alignItems:'center',
        justifyContent: 'center',
        height:25,
        width: 25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#04D771',
        backgroundColor:'#04D771'
    },
    desc:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.color.mainText,
        fontSize:15
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.color.subText,
        fontSize: 12,
    }
})
