import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Header from '../components/header';
import ProductModal, { PRODUCT_MODAL_TYPE } from '../components/product-modal';
import DataService from '../services/data-service';
import '../styles/pages/dashboard.scss';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            modal: '',
            loading: false
        }
    }

    /**
     * Component has mounted, time to get server data:
     * 1. user profile,
     */
    componentDidMount() {
        // Pick up the user profile
        Promise.all([
            DataService.getUserProfile(),
        ]).then(([user]) => {
            this.setState({ user });
        }).catch(err => {
            console.log(err);
        })
    }

    showLoading(show) {
        this.setState({ loading: show });
    }

    showModal(type) {
        if (type in PRODUCT_MODAL_TYPE) {
            this.setState({ modal: PRODUCT_MODAL_TYPE[type] });
        }
    }

    render() {
        const { user, loading, modal } = this.state;

        return (
            <div className="dashboard-container">
                <Header
                    user={user}
                />
                <ProductModal
                    open={!!modal}
                    variant={modal}
                    onClose={() => this.setState({ modal: '' })}
                    onSubmit={() => {}}
                />
                <div className={`${loading ? '' : 'hide'} loading-screen`}>
                    <div><FontAwesomeIcon icon={faSpinner} spin size="5x" /></div>
                </div>
            </div>
        )
    }
}
