import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
        {/* <Route path="/search" component={Search} />
          <Route path="/favorites" component={Favorites} /> */}
        </Router>
        <p>Empty Page</p>
      </div>
    );
  }
}

export default App;
