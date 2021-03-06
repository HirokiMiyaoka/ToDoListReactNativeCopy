import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { TaskItem, TaskData } from './TaskItem';

type Props =
{
  tasks: TaskData[],
  complete?: boolean,
};

export default class TaskList extends Component<Props>
{
  renderEmpty()
  {
    return (
      <View><Text>Empty</Text></View>
    );
  }

  render()
  {
    return (
      <FlatList
        style={ styles.container }
        data={ this.props.tasks }
        renderItem={ ( task ) =>
        {
          return <TaskItem task={ task.item } complete={ !!this.props.complete }></TaskItem>;
        } }
        keyExtractor={ ( item, index ) => { return item.id.toString(); } }
        ListEmptyComponent={ this.renderEmpty() }
      />
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
  },
} );
