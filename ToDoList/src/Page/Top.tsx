import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import TaskList from '../Component/TaskList';
import { TaskData } from '../Component/TaskItem';
// Store
import Store from '../Store';

type Props =
{
  tasks: TaskData[],
  complete: TaskData[],
};

type State =
{
  create: boolean,
  open: boolean,

  newtasktitle: string,
}

export default class Top extends Component<Props,State>
{
  constructor( props: any )
  {
    super( props );
    this.state = { create: false, open: false, newtasktitle: '' };
  }

  private execNewTask()
  {
    //Store.gotoPage( 'edit', { edit: 0 } );
    this.setState( { create: true } );
  }

  private execCancelNewTask()
  {
    this.setState( { create: false } );
  }

  private execCreateTask()
  {
    const title = this.state.newtasktitle;

    Store.updateTask( { id: 0, title: title, subtasks: [] } ).then( ( id ) =>
    {
      Store.gotoPage( 'edit', { edit: id } );
    } );
  }

  render()
  {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>マイタスク</Text>
        <View style={ styles.list }>
          <View>
            <TaskList tasks={ this.props.tasks }></TaskList>
          </View>
          { this.renderComplete( this.props.complete ) }
        </View>
        <View style={ styles.footer }>
        </View>
        { this.renderNewTask() }
        { this.renderNewTaskPopup() }
      </View>
    );
  }

  private renderComplete( list: TaskData[] )
  {
    if ( list.length <= 0 ) { return (<View></View>); }
    return (
      <View>
        <TouchableOpacity style={ styles.completeheader } onPress={ () => { this.setState( { open: !this.state.open } ); } }>
          <Text style={ styles.completetitle }>完了したタスク({ list.length }件)</Text>
        </TouchableOpacity>
        { this.state.open ? <TaskList tasks={ list } complete={ true }></TaskList> : <View style={ styles.completeheaderbottom }></View> }
      </View>
    );
  }

  private renderNewTask()
  {
    return (
      <View style={ styles.createarea }>
        <TouchableOpacity onPress={ () => { this.execNewTask(); } } style={ styles.createbutton } >
          <Text style={ styles.buttontext }>+新しいタスクを追加</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderNewTaskPopup()
  {
    return (
      <TouchableOpacity onPress={ () => { this.execCancelNewTask() } } style={ [ styles.black, this.state.create ? { top: 0 } : { height: 0 } ] }>
        <TouchableOpacity style={ styles.newtask } onPress={ () => {} }>
          <TextInput placeholder="新しいタスク" onChangeText={ ( text ) => { this.setState( { newtasktitle: text } ); } }></TextInput>
          <TouchableOpacity onPress={ () => { this.execCreateTask() } }><Text>保存</Text></TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
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
    padding: 10,
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
  createarea:
  {
    position: 'absolute',
    height: 40,
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },
  createbutton:
  {
    position: 'absolute',
    padding: 10,
    borderRadius: 20,
    top: 0,
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
  completeheader:
  {
    marginTop: 10,
    padding: 5,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  completetitle:
  {
    fontSize: 20,
  },
  completeheaderbottom:
  {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
} );
