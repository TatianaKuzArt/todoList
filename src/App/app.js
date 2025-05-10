import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form.js';
import TaskList from '../task-list/task-list.js';
import Footer from '../footer';
import './app.css';

class App extends React.Component {
    maxId = 100;

    state = {
        data: [],
        filter: 'all',
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            id: this.maxId++,
            createdAt: new Date(),
            edit: false,
            timer: 0,
            isRunning: false,
            startTime: null,
        };
    }

    toggleTimer = (id) => {
        this.setState(({ data }) => ({
            data: data.map((task) => {
                if (task.id !== id) return task;

                if (task.isRunning) {
                    const elapsed = Math.floor((Date.now() - task.startTime) / 1000);
                    return {
                        ...task,
                        isRunning: false,
                        startTime: null,
                        timer: task.timer + elapsed,
                    };
                } else {
                    // Запускаем
                    return {
                        ...task,
                        isRunning: true,
                        startTime: Date.now(),
                    };
                }
            }),
        }));
    };

    deleteTask = (id) => {
        this.setState(({ data }) => ({
            data: data.filter((item) => item.id !== id),
        }));
    };

    onToggleDone = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done,
                isRunning: oldItem.done ? oldItem.isRunning : false,
                timer: oldItem.done ? oldItem.timer : Math.floor(
                    oldItem.timer + (oldItem.startTime ? (Date.now() - oldItem.startTime) / 1000 : 0)
                ),
                startTime: null
            };
            const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
            return { data: newArray };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ data }) => ({
            data: [...data, newItem],
        }));
    };

    clearCompletedTask = () => {
        this.setState((prevState) => ({
            data: prevState.data.filter((task) => !task.done),
        }));
    };

    filter(items, filter) {
        switch (filter) {
            case 'active':
                return items.filter((item) => !item.done);
            case 'completed':
                return items.filter((item) => item.done);
            case 'all':
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    editTask = (id, newLabel) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const updatedItem = { ...oldItem, label: newLabel, edit: false };
            const newArray = [...data.slice(0, idx), updatedItem, ...data.slice(idx + 1)];
            return { data: newArray };
        });
    };

    toggleEditMode = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const updatedItem = { ...oldItem, edit: true };
            const newArray = [...data.slice(0, idx), updatedItem, ...data.slice(idx + 1)];
            return { data: newArray };
        });
    };

    render() {
        const { data, filter } = this.state;
        const visibleItems = this.filter(data, filter);
        const doneCount = data.filter((el) => el.done).length;
        const todoCount = data.length - doneCount;

        return (
            <div className="todo-app">
                <NewTaskForm onItemAdded={this.addItem} />
                <section className="main">
                    <TaskList
                        todos={visibleItems}
                        onDeleted={this.deleteTask}
                        onToggleDone={this.onToggleDone}
                        onEditTask={this.editTask}
                        onToggleEditMode={this.toggleEditMode}
                        onToggleTimer={this.toggleTimer}
                    />
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