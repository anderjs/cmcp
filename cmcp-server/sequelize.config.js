const path = require('path');

module.exports = {
  development: {
    "username": "fastapi",
    "password": "fastapi",
    "database": "fastapi",
    "host": "postgres",
    "dialect": "postgres",
     migrations: {
      path: path.resolve(__dirname, 'src/database/migrations'),
    },
    seeders: {
      path: path.resolve(__dirname, 'src/database/seeders'),
    },
  },
  test: {
    "username": "fastapi",
    "password": "fastapi",
    "database": "fastapi",
    "host": "postgres",
    "dialect": "postgres"
  },
  production: {
    "username": "fastapi",
    "password": "fastapi",
    "database": "fastapi",
    "host": "postgres",
    "dialect": "postgres"
  }
}
