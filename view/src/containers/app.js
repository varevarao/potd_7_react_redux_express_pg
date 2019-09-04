import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import Register from '../pages/register';
import '../styles/app.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
            <Route path="" component={Home} />
            {/* Default to a HTTP 404 page */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}
