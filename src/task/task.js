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

    formatTime(totalSeconds) {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minute = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const sec = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minute}:${sec}`;
    }

    render() {
        const {
            label,
            createdAt,
            onDeleted,
            onToggleDone,
            done,
            onToggleEditMode,
            isRunning,
            onToggleTimer,
        } = this.props;
        const seconds = this.props.timer;


        return (
            <div className="view">
                <input className="toggle" type="checkbox" checked={done} readOnly={true} onClick={onToggleDone}/>
                <div id={'label'}>
                    <span className="title" onClick={onToggleDone}>{label}</span>
                    <span className="description">
                        {isRunning ? <button className="icon icon-pause" onClick={onToggleTimer}></button>
                            : <button className="icon icon-play" onClick={onToggleTimer}></button>}
                        {this.formatTime(seconds)}
                    </span>
                    <span className="description">{formatDistance(createdAt, new Date(), {
                        addSuffix: true,
                        includeSeconds: true
                    })}</span>
                </div>
                <button className="icon icon-edit" onClick={onToggleEditMode}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        );
    }
}
