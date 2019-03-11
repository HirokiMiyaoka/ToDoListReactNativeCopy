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

type State =
{
  open: boolean,
}

export default class Top extends Component<Props,State>
{
  constructor( props: any )
  {
    super( props );
    this.state = { open: false };
  }

  private execNewTask()
  {
    //Store.gotoPage( 'edit', { edit: 0 } );
    this.setState( { open: true } );
  }

  private execCancelNewTask()
  {
    this.setState( { open: false } );
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
        <TouchableOpacity onPress={ () => { this.execCancelNewTask() } } style={ [ styles.black, this.state.open ? { top: 0 } : { height: 0 } ] }>
          <View style={ styles.newtask }>
            <Text>new task</Text>
          </View>
        </TouchableOpacity>
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
  black:
  {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    display: 'flex',
  },
  newtask:
  {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
} );
