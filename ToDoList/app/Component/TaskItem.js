import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Store from '../Store';
export class TaskItem extends Component {
    execDelete() { }
    execEdit() { Store.gotoPage('edit'); }
    renderTaskContent(name) {
        return (React.createElement(View, null,
            React.createElement(TouchableOpacity, { onPress: () => { this.execDelete(); } },
                React.createElement(Text, null, "\u25CB")),
            React.createElement(TouchableOpacity, { onPress: () => { this.execEdit(); } },
                React.createElement(Text, null, name))));
    }
    renderSubtask(subtask) {
        return (React.createElement(View, { style: [styles.subtask, styles.taskview] }, this.renderTaskContent(subtask)));
    }
    renderSubtasks(tasks) {
        if (!tasks) {
            return '';
        }
        return (React.createElement(View, { style: styles.subtasks }, tasks.map((task) => { return this.renderSubtask(task); })));
    }
    render() {
        return (React.createElement(View, { style: [styles.container, styles.taskview] },
            this.renderTaskContent(this.props.task.title),
            this.renderSubtasks(this.props.task.subtasks)));
    }
}
const styles = StyleSheet.create({
    container: {},
    subtasks: {
        paddingLeft: '1em',
    },
    subtask: {},
    taskview: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});
