import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form.js';
import TaskList from '../task-list/task-list.js';
import Footer from '../footer';
import './app.css';

class App extends React.Component {
    maxId = 100;
    state = {
        data: [ ],
        filter: 'all',
    };

    deleteTask = (id) => {
        const newArr = this.state.data.filter((item) => item.id !== id);
        this.setState({
            data: newArr,
        });
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            id: this.maxId++,
            createdAt: new Date(),
            edit: false,
        };
    }

    onToggleDone = (id) => {
        this.setState(({data}) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const newItem = {...oldItem, done: !oldItem.done};
            const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
            return {
                data: newArray,
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({data}) => {
            return {
                data: [...data, newItem],
            };
        });
    };

    clearCompletedTask = () => {
        this.setState((prevState) => ({
            data: prevState.data.filter((task) => !task.done),
        }));
    };

    filter(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => !item.done);
        } else if (filter === 'completed') {
            return items.filter((item) => item.done);
        } else {
            return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    editTask = (id, newLabel) => {
        console.log('edit task ', id)
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const updatedItem = {  ...oldItem, label: newLabel, edit: false,  };
            const newArray = [...data.slice(0, idx), updatedItem, ...data.slice(idx + 1)];
            return { data: newArray };
        });
    };

    toggleEditMode = (id) => {
        console.log('edit toggleEditMode ', id)
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const updatedItem = { ...oldItem, edit: true };
            const newArray = [...data.slice(0, idx), updatedItem, ...data.slice(idx + 1)];
            return { data: newArray };
        });
    };

    render() {
        const {data, filter} = this.state;

        const doneCount = this.state.data.filter((el) => el.done).length;
        const todoCount = this.state.data.length - doneCount;

        const visibleItems = this.filter(data, filter);

        return (
            <div className="todo-app">
                <NewTaskForm onItemAdded={this.addItem}/>
                <section className="main">
                    <TaskList todos={visibleItems} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} onEditTask={this.editTask} onToggleEditMode={this.toggleEditMode} />
                    <Footer
                        todoCount={todoCount}
                        onClearCompleted={this.clearCompletedTask}
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </section>
            </div>
        );
    }
}

export default App;
