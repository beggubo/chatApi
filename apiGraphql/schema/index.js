const schema = require('./schema.js');
const query = require('./query.js');
const mutation = require('./mutation.js');

const resolvers = {
    ...query, ...mutation,
};

module.exports.resolver = resolvers;
module.exports.schema = schema;