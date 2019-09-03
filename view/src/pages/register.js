import { Card, CardContent, FormControl, Input, InputLabel, FormGroup, Button, CardActions } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import '../styles/pages/login.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: '',
            lName: '',
            email: '',
            password: '',
            error: '',
            returnPath: '/dashboard'
        }

        this.performRegistration = this.performRegistration.bind(this);
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

    performRegistration() {
        const { fName, lName, email, password } = this.state;

        AuthenticationService.register({ fName, lName, email, password })
            .then(() => {
                const { location, history } = this.props;
                history.push(location && location.state && location.state.from ? location.state.from : '/dashboard');
            }).catch(error => {
                this.setState({ error })
            });
    }

    performRedirect(path) {
        const { history } = this.props;
        history.push(`/${path}`);
    }

    render() {
        const { error, fName, lName, email, password } = this.state;
        return (
            <div className="login-container">
                <div className="logo-text">
                    <span className="p1">Toolo</span>
                    <span className="p2">city</span>
                </div>
                <Card className="login-card">
                    <CardContent>
                        {error && <div className="login-error">{error}</div>}
                        <FormGroup>
                            <FormControl>
                                <InputLabel>First Name</InputLabel>
                                <Input type="email" className="login-field" value={fName} onChange={evt => this.setState({ fName: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Last Name</InputLabel>
                                <Input type="email" className="login-field" value={lName} onChange={evt => this.setState({ lName: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input type="email" className="login-field" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" className="login-field" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                            </FormControl>
                        </FormGroup>
                    </CardContent>
                    <CardActions className="login-actions">
                        <Button onClick={this.performRegistration}>
                            REGISTER
                        </Button>
                        <div className="login-switch">
                            <span>Already have an account?</span>
                            <Button onClick={() => this.performRedirect('login')}>
                                Login instead
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withRouter(Register);