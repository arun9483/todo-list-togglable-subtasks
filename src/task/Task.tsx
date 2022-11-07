import React, { useCallback, useState } from 'react';
import { ITaskDetails, ITask } from './types';
import './Task.css';
interface TaskProps {
  taskDetails: ITaskDetails;
}
const Task: React.FC<TaskProps> = ({ taskDetails }) => {
  const [title] = useState(taskDetails.title);
  const [subtasks, setSubTasks] = useState(taskDetails.subtasks);

  const toggleTask = useCallback(
    (key: string): void => {
      let newList = subtasks.map((item) => {
        const subHeading = Object.keys(item)[0];
        if (subHeading !== key) {
          return item;
        }
        return {
          [key]: !item[key],
        };
      });
      setSubTasks(newList);
    },
    [subtasks]
  );

  function getCompleted(list: ITask[]): string[] {
    const completed: string[] = [];
    list.forEach((item) => {
      const subHeading = Object.keys(item)[0];
      if (item[subHeading]) {
        completed.push(subHeading);
      }
    });
    return completed;
  }

  function getPending(list: ITask[]): string[] {
    const pending: string[] = [];
    list.forEach((item) => {
      const subHeading = Object.keys(item)[0];
      if (!item[subHeading]) {
        pending.push(subHeading);
      }
    });
    return pending;
  }

  return (
    <div className="task-container">
      <h3>{title}</h3>
      <div className="subtask-container subtask-grid-container">
        <div className="grid-item pending-sub-heading">
          <h4>Not yet completed</h4>
        </div>
        <div className="grid-item pending-list">
          <ul>
            {getPending(subtasks).map((subtitle) => (
              <li
                key={subtitle}
                onClick={() => {
                  toggleTask(subtitle);
                }}
              >
                {subtitle}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-item completed-sub-heading">
          <h4>Completed</h4>
        </div>
        <div className="grid-item completed-list">
          <ul>
            {getCompleted(subtasks).map((subtitle) => (
              <li
                key={subtitle}
                onClick={() => {
                  toggleTask(subtitle);
                }}
              >
                {subtitle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Task;
