/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

//import React, {Component} from 'react';
import React from 'react'
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// Store
import * as Store from './Store';
// Page
import Top from './Page/Top';
import Edit from './Page/Edit';

const instructions = Platform.select(
{
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
} );

type Props = {};

export default class App extends Component<Props,Store.Type>
{
  constructor( props: any )
  {
    super( props );
    this.state = Store.init(
      ( state, cb ) => { this.setState( state, cb ); },
      () => { return this.state; }
    );
  }

  private renderPage( page: string )
  {
    switch ( page )
    {
      case 'edit': return ( <Edit edit={ this.state.edit || 0 }></Edit> );
      default: return ( <Top tasks={ this.state.tasks } complete={ this.state.complete }></Top> );
    }
  }

  render()
  {
    return (
      <View style={styles.container}>
        { this.renderPage( this.state.page ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
