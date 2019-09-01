const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS rentals (
                id SERIAL,
                productId INTEGER REFERENCES products(id),
                userId INTEGER REFERENCES users(id),
                quantity INTEGER NOT NULL,
                PRIMARY KEY(id)
            )
        `).catch(err => {
            console.error('Error creating RENTALS schema\n', err);
        })
    }
}