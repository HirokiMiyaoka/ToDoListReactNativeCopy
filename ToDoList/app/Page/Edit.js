import React from 'react';
import { Component } from 'react';
// Components
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
// Store
import Store from '../Store';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        const task = Store.getTask(this.props.edit);
        this.state = Object.assign({ edit: this.props.edit !== 0 }, task);
    }
    nowTask() {
        const task = {
            id: this.state.id,
            title: this.state.title,
            subtasks: this.state.subtasks,
        };
        return task;
    }
    checkUpdate() {
        return this.state.edit;
    }
    execBack() {
        (this.checkUpdate() ? Store.updateTask(this.nowTask()) : Promise.resolve()).then(() => {
            Store.gotoPage();
        });
    }
    execDelete() {
        Store.removeTask(this.state.id).then(() => {
            Store.gotoPage();
        });
    }
    execAddSubtask() {
        const list = this.state.subtasks ? this.state.subtasks.concat([]) : [];
        list.push('test');
        this.setState({ subtasks: list });
    }
    updateTitle(text) {
        this.setState({ title: text });
    }
    renderHeader() {
        return (React.createElement(View, { style: styles.header },
            React.createElement(TouchableOpacity, { style: [styles.headeritem, styles.back], onPress: () => { this.execBack(); } },
                React.createElement(Text, { style: styles.icon }, "\u2190")),
            React.createElement(TouchableOpacity, { style: [styles.headeritem, styles.delete], onPress: () => { this.execDelete(); } },
                React.createElement(Text, { style: styles.icon }, "\uD83D\uDDD1\uFE0F"))));
    }
    renderMainTask() {
        return (React.createElement(View, { style: styles.contents },
            React.createElement(TouchableOpacity, null,
                React.createElement(Text, null, "\u30DE\u30A4\u30BF\u30B9\u30AF")),
            React.createElement(TextInput, { style: styles.input, placeholder: "Input text.", defaultValue: this.state.title, onChangeText: (text) => { this.updateTitle(text); } })));
    }
    renderAddSubtask() {
        return (React.createElement(TouchableOpacity, { onPress: () => { this.execAddSubtask(); } },
            React.createElement(Text, null, "\u30B5\u30D6\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0")));
    }
    renderSubtask(task) {
        return (React.createElement(View, null,
            React.createElement(Text, null, task)));
    }
    renderSubtasks(tasks) {
        return (React.createElement(FlatList, { style: styles.subtaskscontents, data: tasks, renderItem: (task) => {
                return this.renderSubtask(task.item);
            }, keyExtractor: (item, index) => { return index.toString(); }, ListEmptyComponent: () => { return (React.createElement(View, { style: { height: 0 } })); } }));
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            this.renderHeader(),
            this.renderMainTask(),
            React.createElement(View, { style: styles.subtasks },
                React.createElement(View, { style: styles.subtaskicon },
                    React.createElement(Text, null, "\u21B3")),
                this.renderSubtasks(this.state.subtasks || []),
                this.renderAddSubtask())));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 30,
        left: 0,
        right: 0,
    },
    headeritem: {
        position: 'absolute',
        top: 0,
        width: 30,
    },
    back: {
        left: 0,
    },
    delete: {
        right: 0,
    },
    icon: {
        fontSize: 30,
    },
    contents: {
        padding: 20,
    },
    input: {
        height: 50,
        left: 0,
        right: 0,
        fontSize: 26,
        lineHeight: 26,
    },
    subtasks: {
        left: 0,
        right: 0,
        paddingLeft: 40,
        position: 'relative',
    },
    subtaskscontents: {
        paddingLeft: 20,
        left: 0,
        right: 0,
    },
    subtaskicon: {
        position: 'absolute',
        top: 0,
        left: 10,
    },
});
