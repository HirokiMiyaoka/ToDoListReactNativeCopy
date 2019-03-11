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
        this.state = Object.assign({}, task);
    }
    nowTask() { return this.state; }
    execBack() {
        Store.updateTask(this.nowTask()).then(() => {
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
