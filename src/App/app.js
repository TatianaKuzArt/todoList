import React, { useState, useRef, useCallback } from 'react';
import NewTaskForm from '../new-task-form/new-task-form.js';
import TaskList from '../task-list/task-list.js';
import Footer from '../footer';
import './app.css';

const App = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const maxId = useRef(100);

    const createTodoItem = (label) => ({
        label,
        done: false,
        id: maxId.current++,
        createdAt: new Date(),
        edit: false,
        timer: 0,
        isRunning: false,
        startTime: null,
    });

    const addItem = useCallback((text) => {
        const newItem = createTodoItem(text);
        setData((prevData) => [...prevData, newItem]);
    }, []);

    const deleteTask = useCallback((id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    }, []);

    const toggleTimer = useCallback((id) => {
        setData((prevData) =>
            prevData.map((task) => {
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
                    return {
                        ...task,
                        isRunning: true,
                        startTime: Date.now(),
                    };
                }
            })
        );
    }, []);

    const onToggleDone = useCallback((id) => {
        setData((prevData) =>
            prevData.map((task) => {
                if (task.id !== id) return task;

                const wasDone = task.done;
                const elapsed = wasDone
                    ? 0
                    : task.startTime
                        ? Math.floor((Date.now() - task.startTime) / 1000)
                        : 0;

                return {
                    ...task,
                    done: !wasDone,
                    isRunning: wasDone ? task.isRunning : false,
                    timer: wasDone ? task.timer : task.timer + elapsed,
                    startTime: null,
                };
            })
        );
    }, []);

    const clearCompletedTask = useCallback(() => {
        setData((prevData) => prevData.filter((task) => !task.done));
    }, []);

    const editTask = useCallback((id, newLabel) => {
        setData((prevData) =>
            prevData.map((task) =>
                task.id === id ? { ...task, label: newLabel, edit: false } : task
            )
        );
    }, []);

    const toggleEditMode = useCallback((id) => {
        setData((prevData) =>
            prevData.map((task) =>
                task.id === id ? { ...task, edit: true } : task
            )
        );
    }, []);

    const filterItems = useCallback((items, filter) => {
        switch (filter) {
            case 'active':
                return items.filter((item) => !item.done);
            case 'completed':
                return items.filter((item) => item.done);
            case 'all':
            default:
                return items;
        }
    }, []);

    const onFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    const visibleItems = filterItems(data, filter);
    const doneCount = data.filter((el) => el.done).length;
    const todoCount = data.length - doneCount;

    return (
        <div className="todo-app">
            <NewTaskForm onItemAdded={addItem} />
            <section className="main">
                <TaskList
                    todos={visibleItems}
                    onDeleted={deleteTask}
                    onToggleDone={onToggleDone}
                    onEditTask={editTask}
                    onToggleEditMode={toggleEditMode}
                    onToggleTimer={toggleTimer}
                />
                <Footer
                    todoCount={todoCount}
                    onClearCompleted={clearCompletedTask}
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
            </section>
        </div>
    );
};

export default App;