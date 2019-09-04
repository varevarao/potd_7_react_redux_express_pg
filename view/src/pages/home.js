import React, { Component } from 'react';
import Header from '../components/header';
import '../styles/pages/home.scss';
import { Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    redirectTo(page) {
        const { history } = this.props;
        history.push(`/${page}`);
    }

    render() {
        return (
            <div className="home-container">
                <Header />
                <div className="hero">
                    <Grid container spacing={10}>
                        <Grid item container xs={12} className="hero-text">
                            <Grid item xs={10}>
                                <span>Yet Another Marketplace</span>
                            </Grid>
                            <Grid item xs={10}>
                                for <span> power tools </span>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} className="hero-actions" alignItems="stretch">
                            <Grid item className="full-width" xs={6} md={2}>
                                <Button className="sign-up" variant="contained" onClick={() => this.redirectTo('register')}>Sign Up for free</Button>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Button className="browse" variant="contained" onClick={() => this.redirectTo('dashboard')}>Browse Catalogue</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);