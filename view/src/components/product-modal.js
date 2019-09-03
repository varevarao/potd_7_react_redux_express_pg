import { Button, Card, CardActions, CardContent, FormControl, FormGroup, FormLabel, Input, InputLabel, Modal, OutlinedInput, TextareaAutosize } from '@material-ui/core';
import React, { Component } from 'react';
import '../styles/components/product-modal.scss';

export const PRODUCT_MODAL_TYPE = {
    DETAILS: 'DETAILS',
    NEW: 'NEW'
}

export default class ProductModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            quantity: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    reset() {
        this.setState({
            title: '',
            description: '',
            quantity: 0,
        })
    }

    handleInputChange(evt) {
        const { target } = evt;

        this.setState({ [target.name]: target.value });
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        const { title, description, quantity } = this.state;

        if (!!onSubmit) onSubmit({ title, description, quantity });

        this.reset();
    }

    renderProductForm() {
        const { title, description, quantity } = this.state;

        return (
            <div className="product-form-container">
                <Card>
                    <CardContent>
                        <h2 className="form-title">New Product Listing</h2>
                        <FormGroup className="product-form">
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <OutlinedInput className="input-text" type="text"
                                    name="title"
                                    value={title}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <TextareaAutosize className="multiline" rows={5}
                                    name="description"
                                    value={description}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Quantity</InputLabel>
                                <Input type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                        </FormGroup>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={this.handleSubmit}>Save</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderProductDetails() {
        return (
            <div className="product-details">

            </div>
        )
    }

    renderModalContent(variant) {
        switch (variant) {
            case PRODUCT_MODAL_TYPE.DETAILS:
                return this.renderProductDetails();
            case PRODUCT_MODAL_TYPE.NEW:
                return this.renderProductForm();

            default:
                return null
        }
    }

    render() {
        const { variant, open, onClose } = this.props;
        return !variant ? null : (
            <Modal open={open} onClose={onClose} className="product-modal">
                {
                    this.renderModalContent(variant)
                }
            </Modal>
        )
    }
}
