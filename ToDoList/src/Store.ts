import { TaskData } from './Component/TaskItem';

export type Type =
{
  page: string,
  edit: number,
  tasks: TaskData[],
}

export default class Store
{
  private static ss: ( state: Type ) => void;
  private static gs: () => Type;
  public static init( setState: ( state: Type ) => void, getState: () => Type )
  {
    this.ss = setState;
    this.gs = getState;

    const state: Type =
    {
      page: '',
      edit: 0,
      tasks: [],
    };

    return state;
  }

  public static setState( state: any ) { this.ss( state ); }

  public static gotoPage( page: string, args: { [ keys: string ]: any } = {} )
  {
    args.page = page;
    this.setState( args );
  }

  public static searchTask( id: number ): TaskData|null
  {
    const tasks = this.gs().tasks;

    for ( let task of tasks ) { if ( task.id ) { return task; } }

    return null;
  }

  public static getTask( id: number )
  {
    const task = this.searchTask( id );
    if ( task ) { return task; }

    const etask: TaskData =
    {
      id: 0,
      title: '',
    };

    return etask;
  }
}
