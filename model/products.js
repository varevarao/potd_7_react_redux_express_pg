const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL,
                userId INTEGER REFERENCES users(id),
                title VARCHAR(45) NOT NULL,
                description VARCHAR(500) NOT NULL,
                quantity INTEGER NOT NULL,
                primary key(id)
            )
        `).catch(err => {
            console.error('Error creating PRODUCTS schema\n', err);
        })
    },

    fetchID: id => {
        return db.one({
            text: `
                SELECT * FROM products WHERE id = $1
            `,
            values: [id]
        }).catch(err => {
            console.error('Error fetching product by id', err);
            return null;
        })
    },

    fetchAll: () => {
        return db.manyOrNone('SELECT * FROM products')
            .catch(err => {
                console.error('Error fetching all products', err);
                return null;
            });
    },

    fetchForUser: userId => {
        return db.manyOrNone({
            text: `
                SELECT * FROM products WHERE userId = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching products for user', err);
            return null;
        })
    },

    insert: ({ userId, title, description, quantity }) => {
        return db.one({
            text: `
                INSERT INTO products (userId, title, description, quantity)
                VALUES (
                    $1, $2, $3, $4
                )
            `,
            values: [userId, title, description, quantity]
        }).then((data) => {
            console.info('New product', data);
            // Success
            return data.id;
        }).catch(err => {
            console.error('Error inserting new product', err);
            return false;
        })
    },

    updateQuantity: ({ id, quantity }) => {
        return db.none({
            text: `
                UPDATE products
                SET quantity = $2
                WHERE id = $1
            `,
            values: [id, quantity]
        }).then(() => {
            // Success
            return true;
        }).catch(err => {
            console.error('Error updating quantity for product', err);
            return false;
        })
    }
}