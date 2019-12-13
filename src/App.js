import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import CustomerTrainingList from './components/CustomerTrainingList';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <ToolBar>
          <Typography variant="h6" >
            Personal trainer
          </Typography>
        </ToolBar>
      </AppBar>
      <CustomerTrainingList />
    </div>
  );
}

export default App;
