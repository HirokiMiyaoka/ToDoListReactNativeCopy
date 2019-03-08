import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View } from 'react-native';
import TaskList from '../Component/TaskList';
import { TaskData } from '../Component/TaskItem';

type Props =
{
  tasks: TaskData[],
};

export default class Top extends Component<Props>
{
  render()
  {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>マイタスク</Text>
        <View style={ styles.list }>
          <TaskList tasks={ this.props.tasks }></TaskList>
        </View>
        <View style={ styles.footer }>
          <Text>test</Text>
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
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  list:
  {
    flex: 1,
  },
  header:
  {
    height: 20,
    position: 'absolute',
    top: 0,
  },
  footer:
  {
    height: 20,
    position: 'absolute',
    bottom: 0,
  },
} );
