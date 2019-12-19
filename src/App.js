import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './/components/TrainingCalendar';
import Navigator from './components/Navigator';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <AppBar position="static">
            <BrowserRouter>
            <Navigator />
            <Switch>
              <Route exact path="/" component={CustomerList}></Route>
              <Route path="/CustomerList" component={CustomerList}></Route>
              <Route path="/TrainingList" component={TrainingList}></Route>
              <Route path="/TrainingCalendar" component={TrainingCalendar}></Route>
            </Switch>
            </BrowserRouter>
      </AppBar>
    </div>
  );
}

export default App;
