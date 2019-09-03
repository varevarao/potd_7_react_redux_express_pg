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
                PRIMARY KEY(id)
            )
        `).catch(err => {
            console.error('Error creating RENTALS schema\n', err);
        })
    },

    fetchForProduct: productId => {
        return db.manyOrNone({
            text: `
                SELECT * FROM rentals WHERE product_id = $1
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
                SELECT * FROM rentals WHERE user_id = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching rentals for user', err);
            return null;
        })
    },

    insert: ({ productId, userId, quantity }) => {
        return db.one({
            text: `
                INSERT INTO rentals (user_id, product_id, quantity)
                VALUES (
                    $1, $2, $3
                )
                RETURNING id
            `,
            values: [userId, productId, quantity]
        }).then(({ id }) => {

            // Success
            return id;
        }).catch(err => {
            console.error('Error inserting new product', err);
            return false;
        })
    },

    updateStatus: ({ id, userId, status }) => {
        return db.none({
            text: `
                UPDATE rentals
                SET status = $1
                WHERE id = $2 AND user_id = $3
            `,
            values: [status, id, userId]
        }).then(() => {
            // Success
            return true;
        }).catch(err => {
            console.error('Error updating status for rental', err);
            return false;
        })
    }
}