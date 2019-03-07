export default class Store {
    static init(setState) {
        this.ss = setState;
        const state = {
            page: '',
            edit: 0,
            tasks: [],
        };
        return state;
    }
    static setState(state) { this.ss(state); }
    static gotoPage(page, args = {}) {
        args.page = page;
        this.setState(args);
    }
}
