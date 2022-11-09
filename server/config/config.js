require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      underscored: true
    }
  },
  test: {
    username: process.env.USERNAME_TEST,
    password: process.env.PASSWORD_TEST,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST_TEST,
    port: process.env.PORT_TEST,
    dialect: process.env.DIALECT_TEST
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  }
};
