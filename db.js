import pg from 'pg';

const config = {
  user: 'teamwork',
  database: 'teamwork',
  password: 'password',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

pool.on('connect', () => {
  return 'connected'
});

const createTables = () => {
  const queryText = `CREATE TABLE users (id SERIAL PRIMARY KEY,
    firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50),
    password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
    department VARCHAR(50), address VARCHAR(30)`;

  pool
    .query(queryText)
    .then(res => {
      pool.end();
    })
    .catch(err => {
      pool.end();
      return err;
    });
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createTables,
  pool
};
require('make-runnable')