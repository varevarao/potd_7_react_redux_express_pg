import { ListItemText, Paper, Tab, Tabs } from '@material-ui/core';
import React, { Component } from 'react';
import '../styles/components/catalogue.scss';
import CategoryTab from './category-tab';
import ProductCard from './product-card';

export default class Catalogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        }

        this.tabs = [
            {
                label: "Product Catalogue",
                render: this.renderCategoryTab.bind(this, 'other')
            },
            {
                label: "Your Rentals",
                render: this.renderRentalsTab.bind(this)
            },
            {
                label: "Your Listings",
                render: this.renderCategoryTab.bind(this, 'user')
            },
        ]
    }

    renderCategoryTab(type) {
        const { user, products, cart, onCartChange } = this.props;

        const activeCart = cart.reduce((acc, curr) => {
            acc[curr.productId] = curr;
            return acc;
        }, {});

        // Prepare the display list
        const displayList = products.reduce((result, curr) => {
            // Filter out current user's products
            if (type === 'user' && curr.userId === user.id) result.push(curr);
            // Filter out other user's products
            if (type === 'other' && curr.userId !== user.id) result.push(curr);

            return result;
        }, []);

        return (
            <CategoryTab display="grid">
                {
                    displayList.map((product, index) => {
                        const { id } = product;
                        const { quantity: cartQuantity } = activeCart[id] || { quantity: 0 };

                        return (
                            <ProductCard
                                type={type}
                                onChange={onCartChange}
                                key={`rental-category-content-${index}`}
                                product={product}
                                cartQuantity={cartQuantity}
                            />
                        )
                    })
                }
            </CategoryTab>
        )
    }

    renderRentalsTab() {
        const { products, rentals } = this.props;

        const rentedProducts = products
            .filter(product => !!(rentals.find(rental => rental.productId === product.id)))
            .reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
        return (
            <CategoryTab display="list">
                {
                    rentals.map((rental, index) => {
                        const rentedProduct = rentedProducts[rental.productId];
                        return (
                            <ListItemText
                                key={`rental-tab-content-${index}`}
                                primary={rentedProduct.title}
                                secondary={`from ${rental.userEmail}`}
                            />
                        )
                    })
                }
            </CategoryTab>
        )
    }

    renderUserTab() {

    }

    render() {
        const { activeTab } = this.state;

        return (
            <div className="catalogue">
                <Paper>
                    <Tabs
                        className="catalogue-tabs"
                        value={activeTab}
                        onChange={(evt, value) => this.setState({ activeTab: value })}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                    >
                        {
                            this.tabs.map((tab, index) => (
                                <Tab key={`catalogue-tab-${index}`} label={tab.label} />
                            ))
                        }
                    </Tabs>
                    {
                        this.tabs.map((tab, index) => (
                            <div key={`catalogue-content-${index}`} className={`tab-content ${activeTab === index ? '' : 'hide'}`}>
                                {tab.render()}
                            </div>
                        ))
                    }
                </Paper>
            </div >
        )
    }
}
