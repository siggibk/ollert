import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { Navbar } from './components/ui/Navbar';
import { BoardDetailPage } from './pages/BoardDetailPage';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="App">
        <Switch>
          <Route exact path='/' component={IndexPage} />
          <Route path="/boards/:id" component={BoardDetailPage} />
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