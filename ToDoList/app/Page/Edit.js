import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, View, Button, TextInput } from 'react-native';
// Store
import Store from '../Store';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        const task = Store.getTask(this.props.edit);
        this.state = Object.assign({ edit: this.props.edit !== 0 }, task);
    }
    nowTask() {
        const task = {
            id: this.state.id,
            title: this.state.title,
            subtasks: this.state.subtasks,
        };
        return task;
    }
    checkUpdate() {
        return this.state.edit;
    }
    execBack() {
        (this.checkUpdate() ? Store.updateTask(this.nowTask()) : Promise.resolve()).then(() => {
            Store.gotoPage();
        });
    }
    execDelete() {
        Store.removeTask(this.state.id).then(() => {
            Store.gotoPage();
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.header },
                React.createElement(Button, { title: "back", onPress: () => { this.execBack(); } }),
                React.createElement(Button, { title: "delete", onPress: () => { this.execDelete(); } })),
            React.createElement(View, null,
                React.createElement(TextInput, { style: styles.input, placeholder: "Input title." }))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {},
    input: {
        height: 20,
    },
});
