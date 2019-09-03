import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import '../styles/components/product-modal.scss';

export const PRODUCT_MODAL_TYPE = {
    DETAILS: 'DETAILS',
    NEW: 'NEW'
}

export default class ProductModal extends Component {
    renderProductForm() {
        return (
            <div className="product-form">

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
        const { variant } = this.props;
        return (
            <Modal className="product-modal">
                {
                    renderModalContent(variant);
                }
            </Modal>
        )
    }
}
