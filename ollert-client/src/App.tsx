import React from 'react';
import logo from './logo.svg';
import './App.css';

import { TaskItem } from './components/ui/TaskItem';
import { Task } from './shared/types';
import NewTaskInput from './components/inputs/NewTaskInput';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { Navbar } from './components/ui/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="App">
        <Switch>
          <Route path='/' component={IndexPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/*
const task: Task = {
    id: "hello",
    name: 'Task1',
    description: 'Task description',
    createdAt: new Date()
  }
      <TaskItem task={task} />
      <NewTaskInput />

*/