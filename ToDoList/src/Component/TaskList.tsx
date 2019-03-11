import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, FlatList, View } from 'react-native';
import { TaskItem, TaskData } from './TaskItem';

type Props =
{
  tasks: TaskData[],
};

export default class TaskList extends Component<Props>
{
  render()
  {
    return (
      <FlatList
        style={ styles.container }
        data={ this.props.tasks }
        renderItem={ ( task ) =>
        {
          return <TaskItem task={ task.item }></TaskItem>;
        } }
        keyExtractor={ ( item: TaskData, index: number ) => { return item.id.toString(); } }>
      </FlatList>
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
  },
} );
