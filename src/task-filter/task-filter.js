import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classNameBtn = isActive ? 'selected' : '';
      return (
        <button className={classNameBtn} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });
    return (
      <ul className="filters">
        <li>{buttons}</li>
      </ul>
    );
  }
}
TaskFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func,
};

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};
