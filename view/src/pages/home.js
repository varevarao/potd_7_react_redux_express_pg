import React, { Component } from 'react';
import Header from '../components/header';
import '../styles/pages/home.scss';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Header />
            </div>
        )
    }
}
