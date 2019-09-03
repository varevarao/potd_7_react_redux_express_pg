import { Card, CardContent, FormControl, Input, InputLabel, FormGroup, CardActions, Button } from '@material-ui/core';
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

        if (loggedIn) {
            history.replace(returnPath);
        } else {
            this.setState({ returnPath });
        }
    }

    performRedirect(path) {
        const { history } = this.props;
        history.push(`/${path}`);
    }

    render() {
        const { error, email, password } = this.state;
        return (
            <div className="login-container">
                <div className="logo-text">
                    <span className="p1">Toolo</span>
                    <span className="p2">city</span>
                </div>
                <Card className="login-card">
                    <CardContent>
                        {!!error && <div className="login-error">Heola{error}</div>}
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input type="email" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                            </FormControl>
                        </FormGroup>
                    </CardContent>
                    <CardActions className="login-actions">
                        <Button onClick={this.performLogin}>
                            Login
                        </Button>
                        <div className="login-switch">
                            <span>Don't have an account?</span>
                            <Button onClick={() => this.performRedirect('register')}>
                                Sign Up instead
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withRouter(Login);