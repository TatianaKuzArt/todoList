import React, { Component } from 'react';
import Task from '../task';
import PropTypes from 'prop-types';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    let { todos, onDeleted, onToggleDone, onToggleEditMode, onEditTask } = this.props;

    const elements = todos.map((item) => {
      const { id } = item;
      return <Task {...item} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} onToggleEditMode={()=> onToggleEditMode(id)} onEditTask={onEditTask} />;
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
  onDeleted: () => {},
  onToggleDone: () => {},
};
