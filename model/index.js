const models = [
    require('./users'),
    require('./products'),
    require('./rentals')
]

module.exports = {
    initialize: () => {
        const initPromises = [];
        for (let model of models) {
            if ('init' in model && typeof model['init'] === 'function') {
                initPromises.push(model['init']());
            }
        }

        return Promise.all(initPromises);
    }
}