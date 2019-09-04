import React, { Component } from 'react';
import Catalogue from '../components/catalogue';
import Header from '../components/header';
import ProductModal, { PRODUCT_MODAL_TYPE } from '../components/product-modal';
import DataService from '../services/data-service';
import '../styles/pages/dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            products: [],
            rentals: [],
            cart: [],
            modal: '',
            loading: false
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
            // Split rentals into cart, and others
            const rentalsMap = rentals.reduce((result, curr) => {
                if (curr.status === 'CART') result.cart.push(curr);
                else result.rentals.push(curr);

                return result;
            }, { rentals: [], cart: [] });

            this.setState({ user, products, ...rentalsMap });
        }).catch(err => {
            console.log(err);
        })
    }

    showLoading(show) {
        this.setState({ loading: show });
    }

    onCreateProduct({ title, description, quantity }) {
        this.showLoading(true);
        DataService.postNewProduct({ title, description, quantity })
            .then(savedProduct => {
                const { products } = this.state;
                const existing = products.find(product => product.id === savedProduct.id);

                if (existing) products[products.indexOf(existing)] = savedProduct;
                else products.push(savedProduct);

                this.setState({ products: [...products], modal: '', loading: false });
            }).catch(err => {
                console.error(err);
                this.showLoading(false);
            })
    }

    onCheckout() {
        const { history } = this.props;
        history.push('/checkout');
    }

    onRentalChange(product, quantity) {
        const { cart } = this.state;
        const exisiting = cart.find(item => item.productId === product.id);

        this.showLoading(true);

        if (!exisiting) {
            // If the cart item doesn't exist, create it
            DataService.postNewRental({ productId: product.id, quantity })
                .then(rental => {
                    this.setState({ cart: [...this.state.cart, rental], loading: false });
                })
                .catch(err => {
                    console.error(err);
                    this.showLoading(false);
                });
        } else if (quantity > 0) {
            DataService.rentalUpdate({ id: exisiting.id, quantity: quantity })
                .then(rental => {
                    this.setState({ cart: [...cart.filter(item => item.productId !== product.id), rental], loading: false });
                })
                .catch(err => {
                    console.error(err);
                    this.showLoading(false);
                });
        } else {
            DataService.clearCartItem({ id: exisiting.id })
                .then(done => {
                    if (done) this.setState({ cart: [...cart.filter(item => item.productId !== product.id)], loading: false });
                })
                .catch(err => {
                    console.error(err);
                    this.showLoading(false);
                });
        }
    }

    showModal(type) {
        if (type in PRODUCT_MODAL_TYPE) {
            this.setState({ modal: PRODUCT_MODAL_TYPE[type] });
        }
    }

    render() {
        const { user, products, rentals, cart, loading, modal } = this.state;

        return (
            <div className="dashboard-container">
                <Header
                    user={user}
                    cart={cart}
                    onCreate={() => this.showModal(PRODUCT_MODAL_TYPE.NEW)}
                    onCheckout={this.onCheckout}
                />
                <Catalogue
                    user={user}
                    cart={cart}
                    products={products}
                    rentals={rentals}
                    onCreate={() => this.showModal(PRODUCT_MODAL_TYPE.NEW)}
                    onCartChange={this.onRentalChange}
                />
                <ProductModal
                    open={!!modal}
                    variant={modal}
                    onClose={() => this.setState({ modal: '' })}
                    onSubmit={this.onCreateProduct}
                />
                <div className={`${loading ? '' : 'hide'} loading-screen`}>
                    <div><FontAwesomeIcon icon={faSpinner} spin size="5x" /></div>
                </div>
            </div>
        )
    }
}
