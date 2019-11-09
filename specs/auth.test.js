import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import authAdmin from '../auth/auth';

import config from '../config';

const expect = chai.expect;

chai.use(chaiHttp);

const { pool } = require('../config');

describe('Authenticate admin', () => {
  before('add table', (done) => {
    const query = `CREATE TABLE users (id SERIAL PRIMARY KEY,
    firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50),
    password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
    department VARCHAR(50), address VARCHAR(30)`;

    pool.query(query, (err, res) => {
      if(err) throw err;
    });

    done();
  });

  after('clear table', (done) => {
    const query = `DROP TABLE users`;

    pool.query(query, (err, res) => {
      if(err) throw err;
    });

    done();
  })
  it('should unauthorize access if not admin', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(authAdmin.token)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res).to.be.a('object');
        done();
      });
  });
});
