import React from 'react';
import TaskFilter from '../task-filter';
import PropTypes from 'prop-types';
import './footer.css';

class Footer extends React.Component {
  render() {
    let { todoCount, onClearCompleted, filter, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
Footer.propTypes = {
  todoCount: PropTypes.number,
  onClearCompleted: PropTypes.func,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func,
};

Footer.defaultProps = {
  todoCount: 0,
  onClearCompleted: () => {},
  filter: 'all',
  onFilterChange: () => {},
};
export default Footer;
