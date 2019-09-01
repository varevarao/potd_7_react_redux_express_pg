const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS rentals (
                id SERIAL,
                productId INTEGER REFERENCES products(id),
                userId INTEGER REFERENCES users(id),
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
                SELECT * FROM rentals WHERE productId = $1
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
                SELECT * FROM rentals WHERE userId = $1
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
                INSERT INTO rentals (userId, productId, quantity)
                VALUES (
                    $1, $2, $3
                )
            `,
            values: [userId, productId, quantity]
        }).then((data) => {
            console.log('New rental', data);
            // Success
            return data.id;
        }).catch(err => {
            console.error('Error inserting new product', err);
            return false;
        })
    },

    updateStatus: ({ id, userId, status }) => {
        return db.one({
            text: `
                UPDATE rentals
                SET status = $1
                WHERE id = $2 AND userId = $3
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