require("dotenv").config();

module.exports = {
  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME,
  //   port : process.env.DB_PORT,
  //   host: process.env.DB_HOST,
  //   dialect: "mysql",
  // },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  url: {
    TT_PROJ_ID: process.env.TT_PROJ_ID,
    TT_API_KEY: process.env.TT_API_KEY,
    TT_API_ADMIN_KEY: process.env.TT_API_ADMIN_KEY,
  },



  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   port : process.env.DB_PORT,
  //   sslmode : process.env.DB_SSLMODE,
  //   dialect: "mysql",
  // },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
  

  