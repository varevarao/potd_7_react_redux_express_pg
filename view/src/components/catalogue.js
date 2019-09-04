import { Avatar, ListItemIcon, ListItemText, Tab, Tabs } from '@material-ui/core';
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
                label: "Your Listings",
                render: this.renderCategoryTab.bind(this, 'user')
            },
            {
                label: "Your Rentals",
                render: this.renderRentalsTab.bind(this)
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
                        const { title, userEmail } = rentedProducts[rental.productId];
                        return (
                            <React.Fragment key={`rental-tab-content-${index}`}>
                                <ListItemIcon>
                                    <Avatar src="/logo192.png" />
                                </ListItemIcon>
                                <ListItemText>{title}</ListItemText>
                                <div>
                                    <ListItemText>x {rental.quantity}</ListItemText>
                                </div>
                                <ListItemText className="line-end" primary={`${userEmail}`} secondary={new Date(rental.createdAt).toLocaleString()}></ListItemText>
                            </React.Fragment>
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
                <div className="catalogue-content">
                    {
                        this.tabs.map((tab, index) => (
                            <div key={`catalogue-content-${index}`} className={`tab-content ${activeTab === index ? '' : 'hide'}`}>
                                {tab.render()}
                            </div>
                        ))
                    }
                </div>
            </div >
        )
    }
}
