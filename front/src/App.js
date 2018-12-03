import React, { Component } from 'react';
import './App.css';
import Root from './Root';
import Create from './Create';
import Update from './Update';
import Retrieve from './Retrieve';
import New from './New'
import { BrowserRouter as Router, Route } from "react-router-dom";



class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Root} />
          <Route path="/create" component={Create} />
          <Route path="/update" component={Update} />
          <Route path="/retrieve" component={Retrieve} />
          <Route path="/new/:id" component={New} />
        </div>
      </Router>
    );
  }
}

export default (App);
