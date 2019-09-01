const products = require('../model/products');

module.exports = {
    createNew: async metaData => {
        const { userId, title, description, quantity } = metaData;

        const id = await products.insert({
            userId,
            title,
            description,
            quantity
        });

        if (!!id) {
            return {
                id,
                userId,
                title,
                description,
                quantity
            }
        } else {
            return null;
        }
    },

    forUser: async userId => {
        const userProducts = await products.fetchForUser(userId);
        if(!!userProducts) {
            return userProducts;
        } else {
            return [];
        }
    },

    find: async id => {
        return await products.fetchID(id);
    },

    all: async () => {
        return await products.fetchAll();
    }
}