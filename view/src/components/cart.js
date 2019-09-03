import { Avatar, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import '../styles/components/cart.scss';

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
                                <ListItem key={`checkout-list-${index}`} className="cart-item">
                                    <ListItemIcon>
                                        <Avatar src="/logo192.png" />
                                    </ListItemIcon>
                                    <ListItemText>{product.title}</ListItemText>
                                    <ListItemText secondary={`from ${product.userEmail}`}></ListItemText>
                                    <div className="line-end">
                                        <ListItemText>x {item.quantity}</ListItemText>
                                    </div>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        )
    }
}
