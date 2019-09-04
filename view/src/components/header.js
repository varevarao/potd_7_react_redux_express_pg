import React, { Component } from 'react';
import '../styles/components/header.scss';
import { AppBar, Toolbar, Button, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCartArrowDown, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        const { user, cart, onCreate, onCheckout } = this.props;
        return (
            <AppBar className="header" position="sticky">
                <Toolbar>
                    <div className="logo-text">
                        <span className="p1">Toolo</span>
                        <span className="p2">city</span>
                    </div>
                    <div className="header-end">
                        {!!user && <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>}
                        <div className="user-actions">
                            {!!user && !!onCreate &&
                                <Button className="action new-product" variant="outlined" onClick={onCreate}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <Hidden smDown>
                                        New Listing
                                    </Hidden>
                                </Button>
                            }
                            {!!cart && cart.length > 0 && !!onCheckout &&
                                <Button className="action user-checkout" variant="outlined" onClick={onCheckout}>
                                    <FontAwesomeIcon icon={faCartArrowDown} />
                                    <Hidden smDown>
                                        Checkout
                                    </Hidden>
                                </Button>
                            }
                            {!!!user &&
                                <Button className={`action user-register`} variant="contained" onClick={() => this.handleProfileAction('register')}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <Hidden smDown>
                                        sign up
                                    </Hidden>
                                </Button>
                            }
                            <Button className={`action user-${!!!user ? 'login' : 'logout'}`} variant="text" onClick={() => this.handleProfileAction(!!user ? 'logout' : 'login')}>
                                <FontAwesomeIcon icon={!!user ? faSignOutAlt : faSignInAlt} />
                                <Hidden smDown>
                                    {!!user ? 'sign out' : 'Login'}
                                </Hidden>
                            </Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(Header);