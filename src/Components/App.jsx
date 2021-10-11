import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../static/style/App.css';

import NavigationContainer from './navigation/navigation-container'
import Home from './pages/home'
import Posts from './pages/posts'
import About from './pages/about'
import Contact from './pages/contact'




export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container">
        <Router>
          <NavigationContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </Router>
      </div>
    );
  }
}
