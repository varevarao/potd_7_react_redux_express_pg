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
            error: '',
            returnPath: '/dashboard'
        }

        this.performLogin = this.performLogin.bind(this);
    }

    performLogin() {
        const { email, password, returnPath } = this.state;

        AuthenticationService.login(email, password)
            .then(() => {
                const { history } = this.props;
                history.push(returnPath);
            }).catch(error => {
                this.setState({ error })
            });
    }

    componentDidMount() {
        const loggedIn = AuthenticationService.loggedIn();
        const { location, history } = this.props;

        let { returnPath } = this.state;
        if (location && location.state && location.state.from) {
            returnPath = location.state.from;
        }

        if(loggedIn) {
            history.replace(returnPath);
        } else {
            this.setState({ returnPath });
        }
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
                            <Input type="submit" value="Log In" onClick={this.performLogin} />
                        </FormGroup>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withRouter(Login);