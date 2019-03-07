import React from 'react'
import { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TaskItem, TaskData } from './TaskItem'

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
        } }>
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
