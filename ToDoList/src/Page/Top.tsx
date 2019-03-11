import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TaskList from '../Component/TaskList';
import { TaskData } from '../Component/TaskItem';
// Store
import Store from '../Store';

type Props =
{
  tasks: TaskData[],
};

export default class Top extends Component<Props>
{
  execNewTask()
  {
    Store.gotoPage( 'edit', { edit: 0 } );
  }

  render()
  {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>マイタスク</Text>
        <View style={ styles.list }>
          <TaskList tasks={ this.props.tasks }></TaskList>
        </View>
        <View style={ styles.footer }>
          <TouchableOpacity onPress={ () => { this.execNewTask(); } } style={ styles.createbutton } >
            <Text style={ styles.buttontext }>+新しいタスクを追加</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 40,
    position: 'relative',
  },
  list:
  {
    flex: 1,
  },
  header:
  {
    height: 60,
    position: 'absolute',
    top: 0,
    paddingLeft: 30,
    paddingTop: 5,
    fontSize: 30,
  },
  footer:
  {
    height: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    alignItems: 'center',
  },
  createbutton:
  {
    position: 'absolute',
    padding: 10,
    borderRadius: 20,
    top: -20,
    width: 200,
    backgroundColor: '#4285f4',
    alignItems: 'center',
  },
  buttontext:
  {
    color: '#ffffff',
  },
} );
