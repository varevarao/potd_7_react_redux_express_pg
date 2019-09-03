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

    renderCategoryTab() {
        const { products, rentals } = this.props;

        const activeRentals = rentals
            .filter(rental => rental.status === 'ACTIVE')
            .reduce((acc, curr) => {
                acc[curr.productId] = curr;
                return acc;
            }, {});
        return (
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
                            <ListItemText key={`rental-tab-content-${index}`} primary={rentedProduct.title} secondary={`from ${rental.userEmail}`} />
                        )
                    })
                }
            </CategoryTab>
        )
    }

    render() {
        const { activeTab } = this.state;
        const tabs = [
            {
                label: "Product Catalogue",
                render: this.renderCategoryTab.bind(this)
            },
            {
                label: "Your Rentals",
                render: this.renderRentalsTab.bind(this)
            },
        ]
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
                        {
                            tabs.map((tab, index) => (
                                <Tab key={`catalogue-tab-${index}`} label={tab.label} />
                            ))
                        }

                        <Tab label="" />
                    </Tabs>
                    {
                        tabs.map((tab, index) => (
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
