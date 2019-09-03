import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';

export default class AuthenticatedRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        const authed = AuthenticationService.loggedIn();
        return (
            <Route
                {...rest}
                render={(props) => authed === true
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
            />
        )
    }
}
