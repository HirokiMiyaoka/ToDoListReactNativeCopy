import React from 'react'
import { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select( {
  ios: '',
  android:'',
} );

type Props = {};
export default class TaskItem extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});