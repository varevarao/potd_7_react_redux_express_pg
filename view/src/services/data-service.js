import AuthenticationService from "./authentication-service";

class _DataService {
    constructor() {
        this.domain = (process.env.REACT_APP_API_HOST || '') + '/api';
    }

    getUserProfile() {
        return this._dataRequest('user/profile', {
            method: 'GET'
        }).then(({ user }) => user);
    }

    getUserRentals() {
        return this._dataRequest('rental/current', {
            method: 'GET'
        }).then(({ rentals }) => rentals);
    }

    getAllProducts() {
        return this._dataRequest('product/', {
            method: 'GET'
        }).then(({ products }) => products);
    }

    postNewProduct({ title, description, quantity }) {
        return this._dataRequest('product/create', {
            method: 'POST',
            body: {
                title,
                desc: description,
                qty: quantity
            }
        }).then(({ product }) => {
            return product;
        })
    }

    postNewRental({ productId, quantity }) {
        return this._dataRequest('rental/create', {
            method: 'POST',
            body: {
                productId,
                qty: quantity
            }
        }).then(({ rental }) => {
            return rental;
        })
    }

    clearCartItem({ id }) {
        return this._dataRequest(`rental/cart/${id}`, {
            method: 'POST'
        }).then(({ done }) => {
            return done;
        })
    }

    activateRental({ id }) {
        return this._dataRequest(`rental/activate/${id}`, {
            method: 'POST'
        }).then(({ rental }) => {
            return rental;
        })
    }

    rentalUpdate({ id, quantity }) {
        return this._dataRequest(`rental/update/${id}`, {
            method: 'POST',
            body: {
                qty: quantity
            }
        }).then(({ rental }) => {
            return rental;
        })
    }

    _dataRequest(path, options) {
        return AuthenticationService.fetch(`${this.domain}/${path}`, options)
    }
}

const DataService = new _DataService();
export default DataService;