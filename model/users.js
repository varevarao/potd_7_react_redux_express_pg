const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL,
                firstName VARCHAR(45) NOT NULL,
                lastName VARCHAR(45) NOT NULL,
                email VARCHAR(45) NOT NULL,
                password VARCHAR(45) NOT NULL,
                primary key(id)
            )
        `).catch(err => {
            console.error('Error creating USERS schema\n', err);
        })
    },

    fetchID: id => {
        return db.one({
            text: `
                SELECT * FROM users WHERE id = $1
            `,
            values: [id]
        }).catch(err => {
            console.error('Error fetching user by id', err);
            return null;
        })
    },

    fetchEmail: email => {
        return db.one({
            text: `
                SELECT * FROM users WHERE email = $1
            `,
            values: [email]
        }).catch(err => {
            console.error('Error fetching user by email', err);
            return null;
        })
    },

    insert: ({ firstName, lastName, email, password }) => {
        return db.one({
            text: `
                INSERT INTO users (firstName, lastName, email, password)
                VALUES (
                    $1, $2, $3, $4
                )
            `,
            values: [firstName, lastName, email, password]
        }).then((data) => {
            console.info('New user', data);
            // Success
            return data.id;
        }).catch(err => {
            console.error('Error inserting new user', err);
            return false;
        })
    },
}