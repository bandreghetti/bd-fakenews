import React, { Component } from 'react';
import './App.css';
import Root from './Root';
import Create from './Create';
import Update from './Update'
import { BrowserRouter as Router, Route } from "react-router-dom";



class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Root}></Route>
          <Route path="/create" component={Create}></Route>
          <Route path="/update" component={Update}></Route>
        </div>
      </Router>
    );
  }
}

export default (App);
