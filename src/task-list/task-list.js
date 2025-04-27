import React, {Component} from 'react';
import Task from '../task';
import PropTypes from 'prop-types';
import './task-list.css';

export default class TaskList extends Component {

    render() {
        let {todos, onDeleted, onToggleDone, onToggleEditMode, onEditTask} = this.props;



        const elements = todos.map(({id, done, edit, label, ...itemProps}) => {
            let classNames = '';
            if (done) {
                classNames = 'completed';
            }
            if (edit) {
                classNames = 'editing';
            }

            const editTask = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    this.props.onEditTask(id, event.target.value)
                }
            }

            return (
                <li key={id} className={classNames}>
                    <Task
                        label={label}
                        {...itemProps}
                        done={done}
                        edit={edit}
                        onDeleted={() => onDeleted(id)}
                        onToggleDone={() => onToggleDone(id)}
                        onToggleEditMode={() => onToggleEditMode(id)}
                        onEditTask={onEditTask}
                    />
                    {edit ? <input className="edit" type="text" defaultValue={label} onKeyDown={editTask}  autoFocus/> : null}
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
        })
    ),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
};

TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {
    },
    onToggleDone: () => {
    },
};
