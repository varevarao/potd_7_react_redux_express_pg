const models = [
    require('./users'),
]

module.exports = {
    initialize: async () => {
        for (let model of models) {
            if ('init' in model && typeof model['init'] === 'function') {
                await model['init']();
            }
        }
    }
}