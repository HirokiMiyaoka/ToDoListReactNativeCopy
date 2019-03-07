import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Store from '../Store';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        const task = Store.getTask(this.props.edit);
        this.state = Object.assign({}, task);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "edit page"),
            React.createElement(Button, { title: "back", onPress: () => { Store.gotoPage(); } })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
