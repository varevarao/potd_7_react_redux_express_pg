const rentals = require('../model/rentals');
const products = require('../model/products');

module.exports = {
    createNew: async ({ userId, productId, quantity }) => {
        const product = await products.fetchID(productId);

        // Break out if no such product exists
        if (!product) return null;
        // Break out if we don't have availability
        if (product.quantity < quantity) return null;

        const id = await rentals.insert({
            userId,
            productId,
            quantity
        });

        if (!!id) {
            return {
                id,
                userId,
                productId,
                quantity
            }
        } else {
            return null;
        }
    },

    forUser: async userId => {
        const userRentals = await rentals.fetchForUser(userId);
        if (!!userRentals) {
            return userRentals;
        } else {
            return [];
        }
    },

    forProduct: async productId => {
        const productRentals = await rentals.fetchForProduct(productId);
        if (!!productRentals) {
            return productRentals;
        } else {
            return [];
        }
    },

    activateRental: async ({ userId, id }) => {
        return await rentals.updateStatus({ id, userId, status: 'ACTIVE' });
    },

    closeRental: async ({ userId, id }) => {
        return await rentals.updateStatus({ id, userId, status: 'CLOSED' });
    },
}