import React, { Component } from 'react';
import Task from '../task';
import PropTypes from 'prop-types';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    let { todos, onDeleted, onToggleDone } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return <Task {...itemProps} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />;
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
      status: PropTypes.string,
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
