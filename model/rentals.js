const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS rentals (
                id SERIAL,
                product_id INTEGER REFERENCES products(id),
                user_id INTEGER REFERENCES users(id),
                quantity INTEGER NOT NULL,
                status VARCHAR(20) DEFAULT 'CART',
                created_at TIMESTAMP NOT NULL,
                PRIMARY KEY(id)
            )
        `).catch(err => {
            console.error('Error creating RENTALS schema\n', err);
        })
    },

    fetchID: id => {
        return db.oneOrNone({
            text: `
                SELECT * FROM rentals WHERE id = $1
            `,
            values: [id]
        }).catch(err => {
            console.error('Error fetching rental by id', err);
            return null;
        })
    },

    fetchForProduct: productId => {
        return db.manyOrNone({
            text: `
                SELECT rentals.*, users.email as user_email FROM rentals, users WHERE rentals.user_id = users.id AND rentals.product_id = $1
            `,
            values: [productId]
        }).catch(err => {
            console.error('Error fetching rentals by product id', err);
            return null;
        })
    },

    fetchForUser: userId => {
        return db.manyOrNone({
            text: `
                SELECT rentals.*, users.email as user_email FROM rentals, users WHERE rentals.user_id = users.id AND rentals.user_id = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching rentals for user', err);
            return null;
        })
    },

    fetchUserCart: userId => {
        return db.manyOrNone({
            text: `
                SELECT * FROM rentals WHERE user_id = $1 AND status = $2
            `,
            values: [userId, 'CART']
        }).catch(err => {
            console.error('Error fetching cart for user', err);
            return null;
        })
    },

    insert: ({ productId, userId, quantity }) => {
        return db.one({
            text: `
                INSERT INTO rentals (user_id, product_id, quantity, created_at)
                VALUES (
                    $1, $2, $3, NOW()
                )
                RETURNING *
            `,
            values: [userId, productId, quantity]
        }).catch(err => {
            console.error('Error inserting new product', err);
            return false;
        })
    },

    updateQuantity: ({ id, userId, quantity }) => {
        return db.oneOrNone({
            text: `
                UPDATE rentals
                SET quantity = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [quantity, id, userId]
        }).catch(err => {
            console.error('Error updating status for rental', err);
            return false;
        })
    },

    updateStatus: ({ id, userId, status }) => {
        return db.oneOrNone({
            text: `
                UPDATE rentals
                SET status = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [status, id, userId]
        }).catch(err => {
            console.error('Error updating status for rental', err);
            return false;
        })
    },

    removeCartRental: ({ id, userId }) => {
        return db.none({
            text: `
                DELETE FROM rentals
                WHERE status = $1 AND id = $2 AND user_id = $3
            `,
            values: ['CART', id, userId]
        }).then(() => {
            // Success
            return true;
        }).catch(err => {
            console.error('Error removing cart rental', err);
            return false;
        })
    }
}