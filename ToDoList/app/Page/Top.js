import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, Text, View } from 'react-native';
import TaskList from '../Component/TaskList';
export default class Top extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.header }, "\u30DE\u30A4\u30BF\u30B9\u30AF"),
            React.createElement(View, { style: styles.list },
                React.createElement(TaskList, { tasks: this.props.tasks })),
            React.createElement(View, { style: styles.footer },
                React.createElement(Text, null, "test"))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        position: 'relative',
    },
    list: {
        flex: 1,
    },
    header: {
        height: 20,
        position: 'absolute',
        top: 0,
    },
    footer: {
        height: 20,
        position: 'absolute',
        bottom: 0,
    },
});
