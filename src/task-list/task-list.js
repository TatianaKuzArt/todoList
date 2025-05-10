import React, {Component} from 'react';
import Task from '../task';
import PropTypes from 'prop-types';
import './task-list.css';

export default class TaskList extends Component {
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const {
            todos,
            onDeleted,
            onToggleDone,
            onToggleEditMode,
            onEditTask,
            onToggleTimer,
        } = this.props;

        const elements = todos.map(({ id, done, edit, label, timer, startTime, ...itemProps }) => {
            let classNames = '';
            if (done) classNames = 'completed';
            if (edit) classNames = 'editing';

            const editTask = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.props.onEditTask(id, event.target.value);
                }
            };

            let actualTimer = timer;
            if (itemProps.isRunning && startTime) {
                const diff = Math.floor((Date.now() - startTime) / 1000);
                actualTimer += diff;
            }

            return (
                <li key={id} className={classNames}>
                    <Task
                        label={label}
                        done={done}
                        edit={edit}
                        timer={actualTimer}
                        {...itemProps}
                        onToggleTimer={() => onToggleTimer(id)}
                        onDeleted={() => onDeleted(id)}
                        onToggleDone={() => onToggleDone(id)}
                        onToggleEditMode={() => onToggleEditMode(id)}
                        onEditTask={onEditTask}
                    />
                    {edit ? (
                        <input
                            className="edit"
                            type="text"
                            defaultValue={label}
                            onKeyDown={editTask}
                            autoFocus
                        />
                    ) : null}
                </li>
            );
        });

        return <ul className="todo-list">{elements}</ul>;
    }
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            done: PropTypes.bool.isRequired,
            createdAt: PropTypes.instanceOf(Date),
            edit: PropTypes.bool,
            timer: PropTypes.number.isRequired,
            startTime: PropTypes.number,
            isRunning: PropTypes.bool,
        })
    ),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEditMode: PropTypes.func,
    onEditTask: PropTypes.func,
    onToggleTimer: PropTypes.func,
};

TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEditMode: () => {},
    onEditTask: () => {},
    onToggleTimer: () => {},
};