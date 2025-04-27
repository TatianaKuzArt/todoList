import React, {Component} from 'react';
import {formatDistance} from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {

    // Типы пропсов
    static propTypes = {
        label: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        onDeleted: PropTypes.func,
        onToggleDone: PropTypes.func,
        onEditTask: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.input = React.createRef()
    }


    render() {
        const {
            label,
            createdAt,
            onDeleted,
            onToggleDone,
            done,
            onToggleEditMode,
        } = this.props;



        return (
            <div className="view">
                <input className="toggle" type="checkbox" checked={done} readOnly={true} onClick={onToggleDone}/>
                <label onClick={onToggleDone}>
                    <span className="description">{label}</span>
                    <span className="created">{formatDistance(createdAt, new Date(), {addSuffix: true, includeSeconds: true})}</span>
                </label>
                <button className="icon icon-edit" onClick={onToggleEditMode}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        );
    }
}
