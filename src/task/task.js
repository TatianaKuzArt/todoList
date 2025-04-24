import React, {Component} from 'react';
import {formatDistance} from 'date-fns';
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
        onEditTask: PropTypes.func,
    };
    // Значения по умолчанию
    static defaultProps = {
        done: false,
        edit: false
    };

    constructor(props) {
        super(props);
        this.input = React.createRef()
    }



    render() {
        const {
            id,
            label,
            createdAt,
            edit = false,
            onDeleted,
            onToggleDone,
            done,
            onToggleEditMode,
        } = this.props;

        const editTask = (event) => {
            event.preventDefault()
            this.props.onEditTask(id, this.input.current.value)
        }

        let classNames = '';
        if (done) {
            classNames = ' completed ';
        }
        if (edit) {
            classNames = ' editing ';
        }

        return (
            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={done} readOnly={true} onClick={onToggleDone}/>
                    <label onClick={onToggleDone}>
                        <span className="description">{label}</span>
                        <span className="created">
              {formatDistance(createdAt, new Date(), {addSuffix: true, includeSeconds: true})}
            </span>
                    </label>
                    <button className="icon icon-edit" onClick={onToggleEditMode}></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {edit ?
                    <form onSubmit={editTask}>
                        <input className="edit" type="text" defaultValue={label} ref={this.input} autoFocus/>
                    </form>
                    : null}
            </li>
        );
    }
}
