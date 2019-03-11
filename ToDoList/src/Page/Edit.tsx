import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TaskData } from '../Component/TaskItem';
// Store
import Store from '../Store';

type Props =
{
  edit: number
};

type State = TaskData &
{
  edit: boolean,
};

export default class Edit extends Component<Props,State>
{
  constructor( props: any )
  {
    super( props );
    const task = Store.getTask( this.props.edit );
    this.state = Object.assign( { edit: this.props.edit !== 0 }, task );
  }

  private nowTask(): TaskData
  {
    const task: TaskData =
    {
      id: this.state.id,
      title: this.state.title,
      subtasks: this.state.subtasks,
    };
    return task;
  }

  private checkUpdate()
  {
    return this.state.edit;
  }

  private execBack()
  {
    ( this.checkUpdate() ? Store.updateTask( this.nowTask() ) : Promise.resolve() ).then( () =>
    {
      Store.gotoPage();
    } );
  }

  private execDelete()
  {
    Store.removeTask( this.state.id ).then( () =>
    {
      Store.gotoPage();
    } );
  }

  render()
  {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Button title="back" onPress={ () => { this.execBack(); } }></Button>
          <Button title="delete" onPress={ () => { this.execDelete(); } }></Button>
        </View>
        <View>
          <TextInput style={ styles.input } placeholder="Input title." />
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
  },
  input:
  {
    height: 20,
  },
} );
