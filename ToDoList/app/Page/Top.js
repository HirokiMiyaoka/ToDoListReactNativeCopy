import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from '../Component/TaskList';
export default class Top extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.header }, "\u30DE\u30A4\u30BF\u30B9\u30AF"),
            React.createElement(TaskList, { tasks: [] }),
            React.createElement(View, { style: styles.footer })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 20,
    },
    footer: {
        height: 20,
    },
});
