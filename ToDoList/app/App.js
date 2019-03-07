/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
//import React, {Component} from 'react';
import React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as Store from './Store';
// Page
import Top from './Page/Top';
import Edit from './Page/Edit';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = Store.default.init((state) => { this.setState(state); });
    }
    renderPage(page) {
        switch (page) {
            case 'edit': return (React.createElement(Edit, null));
            default: return (React.createElement(Top, null));
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container }, this.renderPage(this.state.page)));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
