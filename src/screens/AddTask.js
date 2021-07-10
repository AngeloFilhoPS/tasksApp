import React, {Component} from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'
import commonStyles from "../commonStyles";
import DataTimePicker from "@react-native-community/datetimepicker"

import moment from "moment";

const initialSate = {
    desc: '',
    date: new Date(),
    showDatePicker: false
}

export default class AddTask extends Component {

    state = {
        ...initialSate
    }

    save = ()=>{
        const newTask={
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({initialSate})
    }

    getDatePicker = () => {
        let datePicker = <DataTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({date, showDatePicker: false})}
            mode={"date"}
            minimumDate={new Date()}

        />

        const dateSring = moment(this.state.date).format("ddd, D [de] MMMM [de] YYYY")

        if (Platform.OS === "android") {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateSring}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker

    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput
                        placeholder="Informe a descrição"
                        style={styles.input}
                        value={this.state.desc}
                        onChangeText={desc => this.setState({desc})}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.save} style={styles.button}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.props.onCancel}
                        >
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)"

    },
    container: {
        backgroundColor: "#fff",
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.color.today,
        color: commonStyles.color.secondary,
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.color.today
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#f0f0f0',
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 6,

    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 18,
        marginLeft:15
    }

})
