const models = [
    require('./users'),
    require('./products'),
    require('./rentals')
]

module.exports = {
    initialize: async () => {
        const initPromises = [];
        const i = 0;

        for (let model of models) {
            if ('init' in model && typeof model['init'] === 'function') {
                await model['init']();
            }
        }
    }
}