module.exports = {
  client: 'pg',
  connection: {
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: 5432,
    host: 'localhost'
  }
};