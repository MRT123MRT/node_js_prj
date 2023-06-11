const config = require('./knexfile')
const database = require('knex')(config);
export default database;