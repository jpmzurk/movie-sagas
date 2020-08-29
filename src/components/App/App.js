import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home'
import AddMovie from '../AddMovie/AddMovie'
import Details from '../Details/Details'

const App = () => {
  return (
    <div className="App">
      <header className="App-header"> 
      <h1>Movies!</h1>
      </header>







      
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/addMovie" component={AddMovie} />
        <Route path="/details" component={Details} />
        {/* <Route path="/movieCard" component={MovieCard} /> */}
      </Router>
    </div>
  );
}

export default App;
