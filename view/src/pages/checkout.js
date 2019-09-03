import React, { Component } from 'react';
import DataService from '../services/data-service';
import Cart from '../components/cart';
import Header from '../components/header';
import { Grid } from '@material-ui/core';
import Bill from '../components/bill';
import '../styles/pages/checkout.scss';
import { withRouter } from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            products: [],
            cart: [],
            loading: false
        }
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
            // Split rentals into cart, and others
            const rentalsMap = rentals.reduce((result, curr) => {
                if (curr.status === 'CART') result.cart.push(curr);

                return result;
            }, { cart: [] });

            this.setState({ user, products, ...rentalsMap });
        }).catch(err => {
            console.log(err);
        })
    }

    showLoading(show = true) {
        this.setState({ loading: show });
    }

    onSubmit() {
        const { cart } = this.state;
        const { history } = this.props;

        this.showLoading();

        const requests = [];
        for (let item of cart) {
            requests.push(
                DataService.activateRental({ id: item.id })
                    .catch(err => {
                        console.error(err);
                        return null;
                    })
            );
        }

        Promise.all(requests)
            .then(results => {
                // Filter out valid results
                const activated = results.filter(result => !!result);
                const updatedCart = cart.filter(item => !!activated.find(rental => rental.id === item.id));

                if (updatedCart.length > 0) {
                    this.setState({ cart: [...updatedCart], loading: false });
                } else {
                    history.replace('/dashboard');
                }
            })
    }

    render() {
        const { user, cart, products } = this.state;
        return (
            <div className="checkout-container">
                <Header user={user} />
                <Grid container justify="space-evenly" spacing={5} className="checkout-content">
                    <Grid item xs={10} md={6}>
                        <p className="checkout-title">Cart</p>
                        <Cart cart={cart} products={products} />
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <p className="checkout-title">Agreement</p>
                        <Bill onSubmit={() => this.onSubmit()} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Checkout);