import React from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from '../Component/TaskList';

type Props =
{
};

export default class Top extends Component<Props>
{
  render()
  {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>マイタスク</Text>
        <TaskList tasks={ [] }></TaskList>
        <View style={ styles.footer }>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
  },
  header:
  {
    height: 20,
  },
  footer:
  {
    height: 20,
  },
} );
