import React, { Component } from 'react';
import '../styles/components/header.scss';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';

class Header extends Component {
    handleProfileAction(action) {
        const { history } = this.props;
        switch (action) {
            case 'register':
                history.push('/register');
                break;
            case 'login':
                history.push('/login');
                break;
            case 'logout':
                AuthenticationService.logout();
                history.replace('/');
                break;
            default:
                break;
        }
    }

    render() {
        const { user, rentals, onCreate, onCheckout } = this.props;
        return (
            <AppBar className="header" position="sticky">
                <Toolbar>
                    <div className="header-start">
                        <span className="logo-text">Toolocity</span>
                    </div>
                    <div className="header-end">
                        {!!user && <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>}
                        <div className="user-actions">
                            {!!user &&
                                <Button className="action new-product" variant="outlined" onClick={onCreate}>New Listing</Button>
                            }
                            {!!rentals && rentals.length > 0 &&
                                <Button className="action user-checkout" variant="outlined" onClick={onCheckout}>Checkout</Button>
                            }
                            {!!!user &&
                                <Button className={`action user-register`} variant="text" onClick={() => this.handleProfileAction('register')}>register</Button>
                            }
                            <Button className={`action user-${!!user ? 'login' : 'logout'}`} variant="outlined" onClick={() => this.handleProfileAction(!!user ? 'logout' : 'login')}>{!!user ? 'sign out' : 'sign in'}</Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(Header);