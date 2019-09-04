const products = require('../model/products');

const mapProductModel = ({ id, user_id, title, description, quantity, user_email }) => (
    {
        id,
        title,
        description,
        quantity,
        userId: user_id,
        userEmail: user_email
    }
)

module.exports = {
    createNew: async metaData => {
        const { userId, title, description, quantity } = metaData;

        const product = await products.insert({
            userId,
            title,
            description,
            quantity
        });

        if (!!product) {
            return mapProductModel(product);
        } else {
            return null;
        }
    },

    forUser: async userId => {
        const userProducts = await products.fetchForUser(userId);
        if (!!userProducts) {
            return userProducts.map(mapProductModel);
        } else {
            return [];
        }
    },

    find: async id => {
        const product = await products.fetchID(id);
        if (!!product) {
            return mapProductModel(product);
        }

        return null;
    },

    all: async () => {
        const productList = await products.fetchAll();
        if (!!productList) {
            return productList.map(mapProductModel);
        }

        return null;
    }
}