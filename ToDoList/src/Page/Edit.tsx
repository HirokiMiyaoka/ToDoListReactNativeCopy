import React from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TaskData } from '../Component/TaskItem';
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

  render()
  {
    return (
      <View style={ styles.container }>
        <Text>edit page</Text>
        <Button title="back" onPress={ () => { Store.gotoPage(); } }></Button>
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
} );
