import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

const Task = ({
                  label,
                  createdAt,
                  onDeleted,
                  onToggleDone,
                  onEditTask,
                  onToggleEditMode,
                  onToggleTimer,
                  done = false,
                  isRunning = false,
                  timer = 0,
                  startTime = 0,
              }) => {
    const [, forceUpdate] = useState(0); // Используем хак для обновления каждую секунду

    useEffect(() => {
        const intervalId = setInterval(() => {
            forceUpdate((n) => n + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const getDisplayTimer = () => {
        let total = timer;

        if (isRunning && startTime) {
            const diff = Math.floor((Date.now() - startTime) / 1000);
            total += diff;
        }

        return formatTime(total);
    };

    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={done}
                readOnly={true}
                onClick={onToggleDone}
            />
            <div id="label">
        <span className="title" onClick={onToggleDone}>
          {label}
        </span>
                <span className="description">
          {isRunning ? (
              <button className="icon icon-pause" onClick={onToggleTimer}></button>
          ) : (
              <button className="icon icon-play" onClick={onToggleTimer}></button>
          )}
                    {getDisplayTimer()}
        </span>
                <span className="description">
          {formatDistance(createdAt, new Date(), {
              addSuffix: true,
              includeSeconds: true,
          })}
        </span>
            </div>
            <button className="icon icon-edit" onClick={onToggleEditMode}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
    );
};

Task.propTypes = {
    label: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditTask: PropTypes.func,
    onToggleEditMode: PropTypes.func,
    onToggleTimer: PropTypes.func,
    done: PropTypes.bool,
    isRunning: PropTypes.bool,
    timer: PropTypes.number,
    startTime: PropTypes.number,
};

export default Task;