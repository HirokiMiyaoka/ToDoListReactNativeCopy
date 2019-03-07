import React from 'react';
import { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TaskItem } from './TaskItem';
export default class TaskList extends Component {
    render() {
        return (React.createElement(FlatList, { style: styles.container, data: this.props.tasks, renderItem: (task) => {
                return React.createElement(TaskItem, { task: task.item });
            } }));
    }
}
const styles = StyleSheet.create({
    container: {},
});
