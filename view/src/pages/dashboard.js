import React, { Component } from 'react';
import '../styles/pages/dashboard.scss';
import Header from '../components/header';
import Catalogue from '../components/catalogue';
import DataService from '../services/data-service';
import ProductModal, { PRODUCT_MODAL_TYPE } from '../components/product-modal';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            products: [],
            rentals: [],
            modal: ''
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

    onCreateProduct({ title, description, quantity }) {
        DataService.postNewProduct({ title, description, quantity })
            .then(savedProduct => {
                const { products } = this.state;
                const existing = products.find(product => product.id === savedProduct.id);

                if(existing) products[products.indexOf(existing)] = savedProduct;
                else products.push(savedProduct);

                this.setState({ products: [...products], modal: '' });
            })
    }

    onCheckout() {

    }

    onRentalChange() {

    }

    showModal(type) {
        if (type in PRODUCT_MODAL_TYPE) {
            this.setState({ modal: PRODUCT_MODAL_TYPE[type] });
        }
    }

    render() {
        const { user, products, rentals, modal } = this.state;

        return (
            <div className="dashboard-container">
                <Header
                    user={user}
                    rentals={rentals}
                    onCreate={() => this.showModal(PRODUCT_MODAL_TYPE.NEW)}
                    onCheckout={this.onCheckout}
                />
                <Catalogue
                    user={user}
                    products={products}
                    rentals={rentals}
                    onCreate={() => this.showModal(PRODUCT_MODAL_TYPE.NEW)}
                    onCheckout={this.onCheckout}
                    onChange={this.onRentalChange}
                />
                <ProductModal
                    open={!!modal}
                    variant={modal}
                    onClose={() => this.setState({ modal: '' })}
                    onSubmit={this.onCreateProduct}
                />
            </div>
        )
    }
}
