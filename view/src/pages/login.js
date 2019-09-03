import { Card, CardContent, FormControl, Input, InputLabel, FormGroup } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import '../styles/pages/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.performLogin = this.performLogin.bind(this);
    }

    performLogin() {
        const { email, password } = this.state;

        AuthenticationService.login(email, password)
            .then(() => {
                const { location, history } = this.props;
                history.push(location && location.state && location.state.from ? location.state.from : '/dashboard');
            }).catch(error => {
                this.setState({ error })
            });
    }

    render() {
        const { error, email, password } = this.state;
        return (
            <div className="login-container">
                <Card className="login-card">
                    <CardContent>
                        {error && <div className="login-error">{error}</div>}
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input type="email" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                            </FormControl>
                            <Input type="submit" onClick={this.performLogin}>Log In</Input>
                        </FormGroup>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withRouter(Login);