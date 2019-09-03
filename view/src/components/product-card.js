import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import React, { Component } from 'react';

export default class ProductCard extends Component {
    render() {
        const { product, cartQuantity, type, onChange } = this.props;
        const { title, description, quantity } = product;

        return (
            <Card className="product-card">
                <CardContent>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>
                        <span>available</span>
                        <span>{quantity}</span>
                    </p>
                    <p>
                        <span>quantity</span>
                        <span>{cartQuantity}</span>

                    </p>
                </CardContent>
                <CardActions className="product-actions">
                    <Button
                        variant="outlined"
                        disabled={(cartQuantity >= quantity) || (type === 'user')}
                        onClick={() => onChange(product, cartQuantity + 1)}
                    >
                        +
                                    </Button>
                    <Button
                        variant="outlined"
                        disabled={(cartQuantity <= 0) || (type === 'user')}
                        onClick={() => onChange(product, cartQuantity - 1)}
                    >
                        -
                                    </Button>
                </CardActions>
            </Card>
        )
    }
}
