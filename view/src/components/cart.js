import React, { Component } from 'react'
import { Paper, List, ListItem, ListItemText } from '@material-ui/core';

export default class Cart extends Component {
    render() {
        const { cart, products } = this.props;

        const productMap = products.reduce((result, curr) => {
            result[curr.id] = curr;
            return result;
        }, {})
        return (
            <Paper className="checkout-cart">
                <List>
                    {
                        cart.map((item, index) => {
                            const product = productMap[item.productId];
                            return (
                                <ListItem key={`checkout-list-${index}`}>
                                    <ListItemText>{product.title}</ListItemText>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        )
    }
}
