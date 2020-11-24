import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import BooksList from './components/BooksList';
import Navigation from './components/Navigation';
import Details from './components/Details';
import Purchase from './components/Purchase';

class App extends Component {
  render() {
    return (
      <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route exact path="/" component={BooksList} />
                <Route path="/details" component={Details} />
                <Route path="/purchase" component={Purchase} />
              </Switch>
            </div>
          </Router>
    );
  }
}

export default App;
