import React from 'react'
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
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

  private execAddSubtask()
  {
    const list = this.state.subtasks ? this.state.subtasks.concat( [] ) : [];
    list.push( 'test' );
    this.setState( { subtasks: list } )
  }

  private updateTitle( text: string )
  {
    this.setState( { title: text } );
  }

  public renderHeader()
  {
    return (
      <View style={ styles.header }>
        <TouchableOpacity style={ [ styles.headeritem, styles.back ] } onPress={ () => { this.execBack(); } }><Text style={ styles.icon }>←</Text></TouchableOpacity>
        <TouchableOpacity style={ [ styles.headeritem, styles.delete ] } onPress={ () => { this.execDelete(); } }><Text style={ styles.icon }>🗑️</Text></TouchableOpacity>
      </View>
    );
  }

  public renderMainTask()
  {
    return (
      <View style={ styles.contents }>
        <TouchableOpacity><Text>マイタスク</Text></TouchableOpacity>
        <TextInput style={ styles.input } placeholder="Input text." defaultValue={ this.state.title } onChangeText={ ( text ) => { this.updateTitle( text ); } } />
      </View>
    );
  }

  public renderAddSubtask()
  {
    return (
      <TouchableOpacity onPress={ () => { this.execAddSubtask(); } }><Text>サブタスクを追加</Text></TouchableOpacity>
    );
  }

  public renderSubtask( task: string )
  {
    return (
      <View>
        <Text>{ task }</Text>
      </View>
    );
  }

  public renderSubtasks( tasks: string[] )
  {
    return (
      <FlatList
        style={ styles.subtaskscontents }
        data={ tasks }
        renderItem={ ( task ) =>
        {
          return this.renderSubtask( task.item );
        } }
        keyExtractor={ ( item, index ) => { return index.toString(); } }
        ListEmptyComponent={ () => { return ( <View style={ { height: 0 } }></View> ); } }
      />
    );
  }

  public render()
  {
    return (
      <View style={ styles.container }>
        { this.renderHeader() }
        { this.renderMainTask() }
        <View style={ styles.subtasks }>
          <View style={ styles.subtaskicon }><Text>↳</Text></View>
          { this.renderSubtasks( this.state.subtasks || [] ) }
          { this.renderAddSubtask() }
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
    height: 30,
    left: 0,
    right: 0,
  },
  headeritem:
  {
    position: 'absolute',
    top: 0,
    width: 30,
  },
  back:
  {
    left: 0,
  },
  delete:
  {
    right: 0,
  },
  icon:
  {
    fontSize: 30,
  },
  contents:
  {
    padding: 20,
  },
  input:
  {
    height: 50,
    left: 0,
    right: 0,
    fontSize: 26,
    lineHeight: 26,
  },
  subtasks:
  {
    left: 0,
    right: 0,
    paddingLeft: 40,
    position: 'relative',
  },
  subtaskscontents:
  {
    paddingLeft: 20,
    left: 0,
    right: 0,
  },
  subtaskicon:
  {
    position: 'absolute',
    top: 0,
    left: 10,
  },
} );
