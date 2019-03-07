import React from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  private execDelete(){}

  private execEdit() { Store.gotoPage( 'edit', { edit: this.props.task.id } ); }

  private renderTaskContent( name: string )
  {
    return (
      <View>
        <TouchableOpacity onPress={ () => { this.execDelete() } }>
          <Text>○</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { this.execEdit() } }>
          <Text>{ name }</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderSubtask( subtask: string )
  {
    return ( <View style={ [ styles.subtask, styles.taskview ] }>{ this.renderTaskContent( subtask ) }</View> );
  }

  private renderSubtasks( tasks?: string[] )
  {
    if ( !tasks ) { return ''; }
    return (
      <View style={ styles.subtasks }>
        { tasks.map( ( task ) => { return this.renderSubtask( task ); } ) }
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
