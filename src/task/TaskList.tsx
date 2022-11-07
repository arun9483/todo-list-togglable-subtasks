import React from 'react';
import { ITaskList } from './types';
import Task from './Task';
import './TaskList.css';

const taskList: ITaskList = {
  'Organize closet': [
    { 'Donate old clothes and shoes': false },
    { 'Buy new shelf': false },
    { 'Put in shelf by color': false },
  ],
  'Finish homework': [
    { 'Finish math homework': false },
    { 'Finish science homework': false },
    { 'Finish Reactjs homework': false },
  ],
  'Achieve nirvana': [
    { 'Meditate a little': false },
    { 'Gain some wisdom': false },
  ],
};

const TaskList: React.FC<{}> = () => {
  return (
    <ul className="task-list-container">
      {Object.keys(taskList).map((task) => {
        return (
          <li key={task}>
            <Task
              taskDetails={{
                title: task,
                subtasks: taskList[task],
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
