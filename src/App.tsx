import React from 'react';

import TaskList from './task/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>todo-list with togglable subtasks</h1>
      <TaskList />
    </div>
  );
}

export default App;
