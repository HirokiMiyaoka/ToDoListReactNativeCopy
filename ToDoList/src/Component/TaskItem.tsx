import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Store
import Store from '../Store';

export interface TaskData
{
  id: number,
  title: string,
  subtasks?: string[],
}

type Props =
{
  task: TaskData,
};

type State =
{
  del: boolean,
  dels: number[],
};

export class TaskItem extends Component<Props, State>
{
  private static DELETE_TIME = 1000;

  constructor( props: any )
  {
    super( props );
    this.state =
    {
      del: false,
      dels: [],
    };
  }

  private execDelete( index?: number )
  {
    if ( index === undefined )
    {
      // Remove task.
      this.setState( { del: true } );
      setTimeout( () =>
      {
        Store.removeTask( this.props.task.id );
      }, TaskItem.DELETE_TIME );
    } else
    {
      // Remove subtask.
      const newdels = this.state.dels.concat();
      newdels.push( index );
      this.setState( { dels: newdels } );
      setTimeout( () =>
      {
        const newdels = this.state.dels.concat();
        const i = newdels.indexOf( index );
        if ( 0 <= i ) { newdels.splice( i, 1 ); }
        this.setState( { dels: newdels } );
        Store.removeSubTask( this.props.task.id, index );
      }, TaskItem.DELETE_TIME );
    }
  }

  private execEdit() { Store.gotoPage( 'edit', { edit: this.props.task.id } ); }

  private renderTaskContent( name: string, del: boolean, index?: number )
  {
    return (
      <View>
        <TouchableOpacity onPress={ () => { this.execDelete( index ) } }>
          <Text>{ del ? '✔' : '○' }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { this.execEdit() } }>
          <Text>{ name }</Text>
        </TouchableOpacity>
        { this.renderSubtasks( this.props.task.subtasks ) }
      </View>
    );
  }

  private renderSubtask( subtask: string, index: number )
  {
    return ( <View style={ [ styles.subtask, styles.taskview ] }>
      { this.renderTaskContent( subtask, 0 <= this.state.dels.indexOf( index ), index ) }
    </View> );
  }

  private renderSubtasks( tasks?: string[] )
  {
    if ( !tasks ) { return <View></View>; }
    return (
      <View style={ styles.subtasks }>
        { tasks.map( ( task, index ) => { return this.renderSubtask( task, index ); } ) }
      </View>
    );
  }

  render()
  {
    return (
      <View style={ [ styles.container, styles.taskview ] }>
	  	  { this.renderTaskContent( this.props.task.title, this.state.del ) }
      </View>
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
  },
  subtasks:
  {
    paddingLeft: '1em',
  },
  subtask:
  {
  },
  taskview:
  {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
} );
