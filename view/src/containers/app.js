import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from '../pages/checkout';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import NotFound from '../pages/not-found';
import Register from '../pages/register';
import '../styles/app.scss';
import Login from '../pages/login';
import AuthenticatedRoute from '../components/authenticated-route';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <AuthenticatedRoute exact path="/checkout" component={Checkout} />
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
