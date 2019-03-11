import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, FlatList } from 'react-native';
import { TaskItem } from './TaskItem';
export default class TaskList extends Component {
    render() {
        return (React.createElement(FlatList, { style: styles.container, data: this.props.tasks, renderItem: (task) => {
                return React.createElement(TaskItem, { task: task.item });
            }, keyExtractor: (item, index) => { return item.id.toString(); } }));
    }
}
const styles = StyleSheet.create({
    container: {},
});
