import React, { Component } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  // Типы пропсов
  static propTypes = {
    label: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  };
  // Значения по умолчанию
  static defaultProps = {
    done: false,
    edit: false,
    onDeleted: () => {},
    onToggleDone: () => {},
  };
  render() {
    const { label, createdAt, edit = false, onDeleted, onToggleDone, done } = this.props;

    let classNames = '';
    if (done) {
      classNames += ' completed ';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} readOnly={true} onClick={onToggleDone} />
          <label onClick={onToggleDone}>
            <span className="description">{label}</span>
            <span className="created">
              {formatDistance(createdAt, new Date(), { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {edit ? <input className="edit" type="text" /> : null}
      </li>
    );
  }
}
