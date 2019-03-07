import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Store from '../Store';
export class TaskItem extends Component {
    execDelete(index) {
        if (index === undefined) {
            // Remove task.
            Store.removeTask(this.props.task.id);
        }
        else {
            // Remove subtask.
            Store.removeSubTask(this.props.task.id, index);
        }
    }
    execEdit() { Store.gotoPage('edit', { edit: this.props.task.id }); }
    renderTaskContent(name, index) {
        return (React.createElement(View, null,
            React.createElement(TouchableOpacity, { onPress: () => { this.execDelete(index); } },
                React.createElement(Text, null, "\u25CB")),
            React.createElement(TouchableOpacity, { onPress: () => { this.execEdit(); } },
                React.createElement(Text, null, name))));
    }
    renderSubtask(subtask, index) {
        return (React.createElement(View, { style: [styles.subtask, styles.taskview] }, this.renderTaskContent(subtask, index)));
    }
    renderSubtasks(tasks) {
        if (!tasks) {
            return '';
        }
        return (React.createElement(View, { style: styles.subtasks }, tasks.map((task, index) => { return this.renderSubtask(task, index); })));
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
