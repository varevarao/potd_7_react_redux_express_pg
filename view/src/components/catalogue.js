import React, { Component } from 'react'
import { Paper, Tabs, Tab, Card, CardActionArea, CardContent, ListItemText } from '@material-ui/core';
import '../styles/components/catalogue.scss';
import CategoryTab from './category-tab';

export default class Catalogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        }
    }

    renderCategoryTab(visible) {
        const { products, rentals } = this.props;

        const activeRentals = rentals
            .filter(rental => rental.status === 'ACTIVE')
            .reduce((acc, curr) => {
                acc[curr.productId] = curr;
                return acc;
            }, {});
        return !visible ? null : (
            <CategoryTab display="grid">
                {
                    products.map((product, index) => {
                        const { title, description, id } = product;
                        const rental = activeRentals[id];

                        return (
                            <Card key={`rental-category-content-${index}`}>
                                <CardActionArea>

                                </CardActionArea>
                                <CardContent>
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                    <p>
                                        <span>quantity</span>
                                        <span>{!!rental ? rental.quantity : 0}</span>
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </CategoryTab>
        )
    }

    renderRentalsTab(visible) {
        const { products, rentals } = this.props;

        const rentedProducts = products
            .filter(product => !!(rentals.find(rental => rental.productId === product.id)))
            .reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
        return !visible ? null : (
            <CategoryTab display="list">
                {
                    rentals.map((rental, index) => {
                        const rentedProduct = rentedProducts[rental.productId];
                        return (
                            <ListItemText key={`rental-tab-content-${index}`} primary={rentedProduct.title} secondary={`from ${rental.userEmail}`} />
                        )
                    })
                }
            </CategoryTab>
        )
    }

    render() {
        const { activeTab } = this.state;

        return (
            <div className="catalogue">
                <Paper>
                    <Tabs
                        value={activeTab}
                        onChange={(evt, value) => this.setState({ activeTab: value })}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                    >
                        <Tab label="Product Catalogue" />
                        <Tab label="Your Rentals" />
                    </Tabs>
                    {this.renderCategoryTab(activeTab === 0)}
                    {this.renderRentalsTab(activeTab === 1)}
                </Paper>
            </div>
        )
    }
}
