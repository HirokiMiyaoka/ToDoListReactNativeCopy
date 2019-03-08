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

};

export default class Edit extends Component<Props,State>
{
  constructor( props: any )
  {
    super( props );
    const task = Store.getTask( this.props.edit );
    this.state = Object.assign( {}, task );
  }

  private nowTask(): TaskData { return this.state; }

  private execBack()
  {
    Store.updateTask( this.nowTask() ).then( () =>
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
