export default class Store {
    static init(setState, getState) {
        this.ss = setState;
        this.gs = getState;
        const state = {
            page: '',
            edit: 0,
            tasks: [],
        };
        // Debug:
        state.tasks.push({ id: 1, title: 'test1' });
        state.tasks.push({ id: 2, title: 'test2' });
        return state;
    }
    static setState(state) {
        return new Promise((resolve) => {
            this.ss(state, () => { resolve(); });
        });
    }
    static gotoPage(page = '', args = {}) {
        args.page = page;
        return this.setState(args);
    }
    static searchTask(id) {
        const tasks = this.gs().tasks;
        for (let i = 0; i < tasks.length; ++i) {
            if (tasks[i].id) {
                return i;
            }
        }
        return -1;
    }
    static getTask(id) {
        const index = this.searchTask(id);
        if (0 <= index) {
            return this.gs().tasks[index];
        }
        const etask = {
            id: 0,
            title: '',
        };
        return etask;
    }
    static updateTask(data) {
        const id = data.id;
        const tasks = this.gs().tasks;
        if (id <= 0) {
            // Add new task.
            tasks.forEach((task) => {
                if (data.id < task.id) {
                    data.id = task.id + 1;
                }
            });
            if (data.id <= 0) {
                data.id = 1;
            }
            tasks.push(data);
        }
        else {
            // Update task.
            const index = this.searchTask(id);
            if (index < 0) {
                return Promise.reject(new Error('No task.'));
            }
            tasks[index] = data;
        }
        return this.setState({ tasks: tasks });
    }
    static removeTask(id) {
        const index = this.searchTask(id);
        if (index < 0) {
            return Promise.reject(new Error('No task.'));
        }
        const tasks = this.gs().tasks;
        tasks.splice(index, 1);
        return this.setState({ tasks: tasks });
    }
    static removeSubTask(id, sindex) {
        const index = this.searchTask(id);
        if (index < 0) {
            return Promise.reject(new Error('No task.'));
        }
        const tasks = this.gs().tasks;
        const subtasks = tasks[index].subtasks;
        if (subtasks) {
            subtasks.splice(index, 1);
        }
        return this.setState({ tasks: tasks });
    }
}
