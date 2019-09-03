import React, { Component } from 'react'
import { Card, CardContent, FormGroup } from '@material-ui/core';
import AuthenticationService from '../services/authentication-service';

export default class Login extends Component {
    constructor(props) {
        this.state = {
            email: '',
            password: ''
        }

        this.performLogin = this.performLogin.bind(this);
    }

    performLogin() {
        const { email, password } = this.state;
        AuthenticationService.login(email, password);
    }

    render() {
        return (
            <div className="login-container">
                <Card>
                    <CardContent>
                        <form onSubmit={this.performLogin}>

                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
