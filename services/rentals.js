const rentals = require('../model/rentals');
const products = require('../model/products');

const mapRentalModel = ({ id, product_id, user_id, user_email, quantity, status, created_at }) => (
    {
        id,
        quantity,
        status,
        userId: user_id,
        productId: product_id,
        userEmail: user_email,
        createdAt: created_at
    }
)

module.exports = {
    createNew: async ({ userId, productId, quantity }) => {
        const product = await products.fetchID(productId);

        // Break out if no such product exists
        if (!product) return null;
        // Break out if we don't have availability
        if (product.quantity < quantity) return null;

        const rental = await rentals.insert({
            userId,
            productId,
            quantity
        });

        if (!!rental) {
            return mapRentalModel(rental);
        } else {
            return null;
        }
    },

    forUser: async userId => {
        const userRentals = await rentals.fetchForUser(userId);
        if (!!userRentals) {
            return userRentals.map(mapRentalModel);
        } else {
            return [];
        }
    },

    forProduct: async productId => {
        const productRentals = await rentals.fetchForProduct(productId);
        if (!!productRentals) {
            return productRentals.map(mapRentalModel);
        } else {
            return [];
        }
    },

    updateQuantity: async ({ id, userId, quantity }) => {
        const updated = await rentals.updateQuantity({ id, userId, quantity });
        return mapRentalModel(updated);
    },

    checkoutCart: async ({ userId }) => {
        const cart = await rentals.fetchUserCart(userId);
        if (cart && cart.length) {
            // TODO
        } else {
            return false;
        }
    },

    activateRental: async ({ userId, id }) => {
        const rental = await rentals.fetchID(id);
        if (!!rental) {
            const product = await products.fetchID(rental.product_id);
            if (product.quantity >= rental.quantity) {
                // Update the product
                await products.updateQuantity({ id: product.id, quantity: product.quantity - rental.quantity });
                // Then the rental
                const result = await rentals.updateStatus({ id, userId, status: 'ACTIVE' });
                return mapRentalModel(result);
            } else {
                console.warn('Not engough quantity.');
                return null;
            }
        } else {
            console.warn('No rental with given ID found: ', id);
            return null;
        }
    },

    closeRental: async ({ userId, id }) => {
        const rental = await rentals.fetchID(id);
        if (!!rental) {
            const product = await products.fetchID(rental.product_id);
            // Update the product
            await products.updateQuantity({ id: product.id, quantity: product.quantity + rental.quantity });
            // Then the rental
            const result = await rentals.updateStatus({ id, userId, status: 'CLOSED' });
            return mapRentalModel(result);
        } else {
            return false;
        }
    },

    removeCartRental: async ({ userId, id }) => {
        const rental = await rentals.fetchID(id);
        if (!!rental && rental.status === 'CART') {
            return await rentals.removeCartRental({ id, userId });
        } else {
            return false;
        }
    }
}