import decode from 'jwt-decode';

const DOMAIN = process.env.REACT_APP_API_HOST || ''

class _AuthenticationService {
    constructor() {
        this.domain = DOMAIN + '/api';
    }

    authRequest(path, bodyJSON) {
        return this.fetch(`${this.domain}/user/${path}`, {
            method: 'POST',
            body: JSON.stringify(bodyJSON)
        }).then(res => {
            this.setToken(res.token); // Setting the token in localStorage
            return Promise.resolve(res);
        }).catch(err => {
            console.error(err);
            return this._handleError(err);
        });
    }

    register({ fName, lName, email, password }) {
        return this.authRequest('register', {
            fName,
            lName,
            email,
            password
        });
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.authRequest('login', {
            email,
            password
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getUser() {
        // Using jwt-decode npm package to decode the token
        return this.loggedIn() ? decode(this.getToken()) : null;
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        if(typeof options.body === 'object') options.body = JSON.stringify(options.body);

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _handleError(err) {
        // Extracts and returns a rejected promise, with the error message (if any)
        if (!!err.response) {
            const { response } = err;
            const json = response.json();

            if(json) return Promise.reject(json.message);
            else return Promise.reject(response.statusText);
        }

        return Promise.reject(err);
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

const AuthenticationService = new _AuthenticationService();
export default AuthenticationService;