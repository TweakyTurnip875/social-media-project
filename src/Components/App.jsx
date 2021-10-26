import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAtom, faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle, faAtom, faSpinner)

import NavigationContainer from './navigation/navigation-container'
import Home from './pages/home'
import Posts from './pages/posts'
import About from './pages/about'
import Contact from './pages/contact'
import PostDetail from './pages/post-detail'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginStatus: "NOT_LOGGED_IN",
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleSuccessfulLogin() {
    this.setState({
      loginStatus: "LOGGED_IN"
    })
  }
  handleUnsuccessfulLogin() {
    this.setState({
      loginStatus: "NOT_LOGGED_IN"
    })
  }
  
  handleLogin() {
    axios.post("https://api.devcamp.space/sessions",
    {
      client: {
        email: import.meta.env.VITE_EMAIL,
        password: import.meta.env.VITE_PASS,
      },
    },
    { withCredentials: true }
    ).then(res => {
      if(res.data.status === "created") {
        console.log("created")
        this.handleSuccessfulLogin()
      } else {
        console.log("error")
        this.handleUnsuccessfulLogin()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="container">

        {this.state.loginStatus === "NOT_LOGGED_IN"
        ? <div>{this.state.loginStatus}</div>
        : null}
        {this.state.loginStatus === "NOT_LOGGED_IN" 
        ? this.handleLogin()
        : null}
        <Router>
          <NavigationContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/post-detail/:slug/" 
              render={props => (
                <PostDetail {...props} />
              )} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
