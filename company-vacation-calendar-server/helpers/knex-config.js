if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = require("knex")({
  client: process.env.KNEX_CLIENT,
  connection: {
    host: process.env.KNEX_CONNECTION_HOST,
    port: +process.env.KNEX_CONNECTION_PORT,
    user: process.env.KNEX_CONNECTION_USER,
    password: process.env.KNEX_CONNECTION_PASS,
    database: process.env.KNEX_CONNECTION_DB,
  },
});

module.exports = {
  db,
};
