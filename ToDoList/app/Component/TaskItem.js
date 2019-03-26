import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Store
import Store from '../Store';
export class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                del: false,
                dels: [],
            };
    }
    execDelete(index) {
        if (index === undefined) {
            // Remove task.
            this.setState({ del: true });
            setTimeout(() => {
                this.setState({ del: false });
                Store.removeTask(this.props.task.id);
            }, TaskItem.DELETE_TIME);
        }
        else {
            // Remove subtask.
            const newdels = this.state.dels.concat();
            newdels.push(index);
            this.setState({ dels: newdels });
            setTimeout(() => {
                const newdels = this.state.dels.concat();
                const i = newdels.indexOf(index);
                if (0 <= i) {
                    newdels.splice(i, 1);
                }
                this.setState({ dels: newdels });
                Store.removeSubTask(this.props.task.id, index);
            }, TaskItem.DELETE_TIME);
        }
    }
    execEdit() { Store.gotoPage('edit', { edit: this.props.task.id }); }
    render() {
        return (React.createElement(View, { style: [styles.container, styles.taskview] },
            this.renderTaskContent(this.props.task.title, this.state.del),
            this.renderSubtasks(this.props.task.subtasks)));
    }
    renderTaskContent(name, del, index) {
        return (React.createElement(View, { style: styles.taskline },
            React.createElement(TouchableOpacity, { onPress: () => { this.execDelete(index); }, style: styles.checkbutton },
                React.createElement(Text, { style: styles.checktext }, del || this.props.complete ? '✔' : '○')),
            React.createElement(TouchableOpacity, { onPress: () => { this.execEdit(); } },
                React.createElement(Text, { style: [styles.text, this.props.complete ? styles.completetext : {}] }, name))));
    }
    renderSubtask(subtask, index) {
        return (React.createElement(View, { style: [styles.subtask, styles.subtaskview], key: index.toString() }, this.renderTaskContent(subtask, 0 <= this.state.dels.indexOf(index), index)));
    }
    renderSubtasks(tasks) {
        if (!tasks) {
            return React.createElement(View, null);
        }
        return (React.createElement(View, { style: styles.subtasks }, tasks.map((task, index) => { return this.renderSubtask(task, index); })));
    }
}
TaskItem.DELETE_TIME = 1000;
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        fontSize: 20,
    },
    subtasks: {
        paddingLeft: 30,
    },
    subtask: {
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
    },
    taskline: {
        paddingLeft: 30,
    },
    checkbutton: {
        position: 'absolute',
        top: -25,
        left: -10,
    },
    checktext: {
        fontSize: 50,
    },
    taskview: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    subtaskview: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    completetext: {
        textDecorationLine: 'line-through',
    },
});
