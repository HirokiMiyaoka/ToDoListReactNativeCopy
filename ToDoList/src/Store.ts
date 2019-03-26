import { TaskData } from './Component/TaskItem';

export type Type =
{
  page: string,
  edit: number,
  tasks: TaskData[],
  complete: TaskData[],
}

export function init( setState: ( state: Type, cb: () => void ) => void, getState: () => Type )
{
  return Store.init( setState, getState );
}

export default class Store
{
  private static ss: ( state: Type, cb: () => void ) => void;
  private static gs: () => Type;
  public static init( setState: ( state: Type, cb: () => void ) => void, getState: () => Type )
  {
    this.ss = setState;
    this.gs = getState;

    const state: Type =
    {
      page: '',
      edit: 0,
      tasks: [],
      complete: [],
    };

    // Debug:
    state.tasks.push( { id: 1, title: 'test1' } );
    state.tasks.push( { id: 2, title: 'test2' } );
    state.tasks.push( { id: 3, title: 'test3' } );
    state.complete.push( { id: 4, title: 'task4' } );

    return state;
  }

  public static setState( state: any ): Promise<void>
  {
    return new Promise( ( resolve ) =>
    {
      this.ss( state, () => { resolve(); } );
    } );
  }

  public static gotoPage( page: string = '', args: { [ keys: string ]: any } = {} )
  {
    args.page = page;
    return this.setState( args );
  }

  public static searchTask( id: number ): number
  {
    const tasks = this.gs().tasks;

    for ( let i = 0 ; i < tasks.length ; ++i )
    {
      if ( tasks[ i ].id === id ) { return i; }
    }

    return -1;
  }

  public static searchTaskComplete( id: number ): number
  {
    const tasks = this.gs().complete;

    for ( let i = 0 ; i < tasks.length ; ++i )
    {
      if ( tasks[ i ].id === id ) { return i; }
    }

    return -1;
  }

  public static getTask( id: number )
  {
    let index = this.searchTask( id );

    if ( 0 <= index ){ return { complete: false, task: this.gs().tasks[ index ] }; }

    index = this.searchTaskComplete( id );

    if ( 0 <= index ){ return { complete: true, task: this.gs().complete[ index ] }; }

    const etask: TaskData =
    {
      id: 0,
      title: '',
    };

    return { complete: false, task: etask };
  }

  public static updateTask( data: TaskData )
  {
    const id = data.id;
    const tasks = this.gs().tasks;
    if ( id <= 0 )
    {
      // Add new task.
      tasks.forEach( ( task ) =>
      {
        if ( data.id <= task.id ) { data.id = task.id + 1; }
      } );
      if ( data.id <= 0 ) { data.id = 1; }
      tasks.push( data );
    } else
    {
      // Update task.
      const index = this.searchTask( id );
      if ( index < 0 ) { return Promise.reject( new Error( 'No task.' ) ); }
      tasks[ index ] = data;
    }
    return this.setState( { tasks: tasks } );
  }

  public static removeTask( id: number )
  {
    const index = this.searchTask( id );
    if ( index < 0 ) { return Promise.reject( new Error( 'No task.' ) ); }
    const tasks = this.gs().tasks;
    tasks.splice( index, 1 );
    return this.setState( { tasks: tasks } );
  }

  public static removeSubTask( id: number, sindex: number )
  {
    const index = this.searchTask( id );
    if ( index < 0 ) { return Promise.reject( new Error( 'No task.' ) ); }
    const tasks = this.gs().tasks;
    const subtasks = tasks[ index ].subtasks;
    if ( subtasks ) { subtasks.splice( sindex, 1 ); }
    return this.setState( { tasks: tasks } );
  }
}
