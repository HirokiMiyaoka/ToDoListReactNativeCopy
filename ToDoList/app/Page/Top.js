import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TaskList from '../Component/TaskList';
export default class Top extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    execNewTask() {
        //Store.gotoPage( 'edit', { edit: 0 } );
        this.setState({ open: true });
    }
    execCancelNewTask() {
        this.setState({ open: false });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.header }, "\u30DE\u30A4\u30BF\u30B9\u30AF"),
            React.createElement(View, { style: styles.list },
                React.createElement(TaskList, { tasks: this.props.tasks })),
            React.createElement(View, { style: styles.footer }),
            React.createElement(View, { style: styles.createarea },
                React.createElement(TouchableOpacity, { onPress: () => { this.execNewTask(); }, style: styles.createbutton },
                    React.createElement(Text, { style: styles.buttontext }, "+\u65B0\u3057\u3044\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0"))),
            React.createElement(TouchableOpacity, { onPress: () => { this.execCancelNewTask(); }, style: [styles.black, this.state.open ? { top: 0 } : { height: 0 }] },
                React.createElement(View, { style: styles.newtask },
                    React.createElement(Text, null, "new task")))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 40,
        position: 'relative',
    },
    list: {
        flex: 1,
    },
    header: {
        height: 60,
        position: 'absolute',
        top: 0,
        paddingLeft: 30,
        paddingTop: 5,
        fontSize: 30,
    },
    footer: {
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        alignItems: 'center',
    },
    createarea: {
        position: 'absolute',
        height: 40,
        left: 0,
        right: 0,
        bottom: 20,
        alignItems: 'center',
    },
    createbutton: {
        position: 'absolute',
        padding: 10,
        borderRadius: 20,
        top: 0,
        width: 200,
        backgroundColor: '#4285f4',
        alignItems: 'center',
    },
    buttontext: {
        color: '#ffffff',
    },
    black: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        display: 'flex',
    },
    newtask: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
