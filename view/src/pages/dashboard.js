import React, { Component } from 'react';
import '../styles/pages/dashboard.scss';
import Header from '../components/header';
import Catalogue from '../components/catalogue';
import DataService from '../services/data-service';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            products: [],
            rentals: []
        }

        this.onCreateProduct = this.onCreateProduct.bind(this);
        this.onCheckout = this.onCheckout.bind(this);
        this.onRentalChange = this.onRentalChange.bind(this);
    }

    /**
     * Component has mounted, time to get server data:
     * 1. user profile,
     * 2. product list
     */
    componentDidMount() {
        // Pick up the user profile, products, and current user rentals
        Promise.all([
            DataService.getUserProfile(),
            DataService.getAllProducts(),
            DataService.getUserRentals()
        ]).then(([user, products, rentals]) => {
            this.setState({ user, products, rentals });
        }).catch(err => {
            console.log(err);
        })
    }

    onCreateProduct() {

    }

    onCheckout() {

    }

    onRentalChange() {

    }

    render() {
        const { user, products, rentals } = this.state;

        console.log(this.state);
        return (
            <div className="dashboard-container">
                <Header user={user} />
                <Catalogue
                    user={user}
                    products={products}
                    rentals={rentals}
                    onCreate={this.onCreateProduct}
                    onCheckout={this.onCheckout}
                    onChange={this.onRentalChange}
                />
            </div>
        )
    }
}
