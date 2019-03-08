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

export class TaskItem extends Component<Props>
{
  private execDelete( index?: number )
  {
    if ( index === undefined )
    {
      // Remove task.
      Store.removeTask( this.props.task.id );
    } else
    {
      // Remove subtask.
      Store.removeSubTask( this.props.task.id, index );
    }
  }

  private execEdit() { Store.gotoPage( 'edit', { edit: this.props.task.id } ); }

  private renderTaskContent( name: string, index?: number )
  {
    return (
      <View>
        <TouchableOpacity onPress={ () => { this.execDelete( index ) } }>
          <Text>○</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { this.execEdit() } }>
          <Text>{ name }</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderSubtask( subtask: string, index: number )
  {
    return ( <View style={ [ styles.subtask, styles.taskview ] }>{ this.renderTaskContent( subtask, index ) }</View> );
  }

  private renderSubtasks( tasks?: string[] )
  {
    if ( !tasks ) { return ''; }
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
	  	  { this.renderTaskContent( this.props.task.title ) }
        { this.renderSubtasks( this.props.task.subtasks ) }
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
