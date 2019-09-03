import { Card, CardContent, FormControl, Input, InputLabel, FormGroup } from '@material-ui/core';
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
            error: ''
        }

        this.performRegistration = this.performRegistration.bind(this);
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

    render() {
        const { error, fName, lName, email, password } = this.state;
        return (
            <div className="login-container">
                <Card className="login-card">
                    <CardContent>
                        {error && <div className="login-error">{error}</div>}
                        <FormGroup>
                            <FormControl>
                                <InputLabel>First Name</InputLabel>
                                <Input type="email" value={fName} onChange={evt => this.setState({ fName: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Last Name</InputLabel>
                                <Input type="email" value={lName} onChange={evt => this.setState({ lName: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input type="email" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                            </FormControl>
                            <Input type="submit" value="Register" onClick={this.performRegistration} />
                        </FormGroup>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withRouter(Register);