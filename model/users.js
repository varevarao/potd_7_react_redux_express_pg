const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER AUTO_INCREMENT NOT NULL,
                first_name VARCHAR(45) NOT NULL,
                last_name VARCHAR(45) NOT NULL,
                email VARCHAR(45) NOT NULL,
                primary key(id)
            )
        `).catch(err => {
            console.error('Error creating USERS schema\n', err);
        })
    }
}