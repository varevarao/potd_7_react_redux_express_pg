import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, FormControl, FormGroup, FormLabel, Grid, Modal, OutlinedInput, TextareaAutosize } from '@material-ui/core';
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
        const { onClose } = this.props;

        return (
            <Grid container className="product-form-container" justify="center">
                <Grid item xs={10} md={6}>
                    <Card className="modal-card">
                        <CardContent>
                            <div className="form-header">
                                <span className="form-title">New Product Listing</span>
                                <span onClick={onClose}><FontAwesomeIcon icon={faWindowClose} /></span>
                            </div>
                            <FormGroup className="product-form">
                                <div className="part-1">
                                    <FormControl className="product-name">
                                        <FormLabel>Title</FormLabel>
                                        <OutlinedInput className="input-text" type="text"
                                            name="title"
                                            placeholder="My cool power tool"
                                            value={title}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormControl>
                                    <FormControl className="product-qty">
                                        <FormLabel>Quantity</FormLabel>
                                        <OutlinedInput type="number"
                                            name="quantity"
                                            placeholder="all these tools!"
                                            value={quantity}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormControl>
                                </div>
                                <FormControl className="part-2">
                                    <FormLabel>Description</FormLabel>
                                    <TextareaAutosize className="multiline" rows={5}
                                        name="description"
                                        placeholder="A shot description about the product. This is where you get to state your buyer requirements too."
                                        value={description}
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                            </FormGroup>
                        </CardContent>
                        <CardActions className="form-actions">
                            <Button color="secondary" variant="contained" onClick={this.handleSubmit}>
                                <span>Save</span>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
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
