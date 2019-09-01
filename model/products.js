const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER AUTO_INCREMENT NOT NULL,
                title VARCHAR(45) NOT NULL,
                description VARCHAR(500) NOT NULL,
                quantity INTEGER NOT NULL,
                primary key(id)
            )
        `).catch(err => {
            console.error('Error creating PRODUCTS schema\n', err);
        })
    }
}