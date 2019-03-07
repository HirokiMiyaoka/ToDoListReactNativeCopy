import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class Edit extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "edit page")));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
