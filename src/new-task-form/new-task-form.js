import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  static defaultProps = {
    onItemAdded: () => {},
  };
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.label.trim()) {
      this.props.onItemAdded(this.state.label);
      this.setState({ label: '' });
    }
  };
  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type="text"
          value={this.state.label}
          onChange={this.onLabelChange}
          className="new-todo"
          autoFocus
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}
