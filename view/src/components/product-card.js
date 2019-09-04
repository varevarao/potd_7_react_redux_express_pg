import { Button, Card, CardActions, CardContent, CardActionArea, CardMedia, Input } from '@material-ui/core';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default class ProductCard extends Component {
    render() {
        const { product, cartQuantity, type, onChange } = this.props;
        const { title, description, quantity } = product;

        return (
            <Card className="product-card">
                <CardActionArea className="product-header">
                    <CardMedia component='img' image="/pt-1.jpg" />
                </CardActionArea>
                <CardContent className="product-content">
                    <span>{title}</span>
                    <span>{description}</span>
                </CardContent>

                <CardActions className="product-actions">
                    {type === 'user' ?
                        (
                            <>
                                <span className="sub-text">available: {quantity}</span>
                            </>
                        )
                        :
                        (
                            <>
                                <div>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    <Input type="number" value={cartQuantity} />
                                    <span>/ {quantity}</span>
                                </div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        className="cart-add"
                                        disabled={(cartQuantity >= quantity) || (type === 'user')}
                                        onClick={() => onChange(product, cartQuantity + 1)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className="cart-remove"
                                        disabled={(cartQuantity <= 0) || (type === 'user')}
                                        onClick={() => onChange(product, cartQuantity - 1)}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </CardActions>
            </Card>
        )
    }
}
