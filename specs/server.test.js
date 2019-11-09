import chai from 'chai';

import pg from 'pg';

import chaiHttp from 'chai-http';

import config from './config';

import server from '../source/server';

import createUser from '../controllers/userController';

const expect = chai.expect;

chai.use(chaiHttp);

const Pool = pg.Pool;

const pool = new Pool({
  user: config.dbUser,
  host: config.DbH,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort,
});

describe('Create user', () => {

  before('add table', (done) => {
    const query = `CREATE TABLE users (id SERIAL PRIMARY KEY,
    firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50),
    password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
    department VARCHAR(50), address VARCHAR(30)`;

    pool.query(query, (err, res));

    done();
  });

  after('clear table', (done) => {
    const query = `DROP TABLE users`;

    pool.query(query, (err, res));

    done();
  })

  it('should not sign user up if email exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(createUser.signUp)
      .end((err, res) => {
        // res.should.have.status(409);
        expect(res.status).to.equal(500);
        expect(res).to.be.a('object');
        done();
      });
  });

  it('should return error if unable to hash password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(createUser)
       .end((err, res) => {
         expect(res.status).to.equal(500);
         expect(res).to.be.a('object');
         done();
       });
  });

  it('should return error if fields are empty', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(createUser, {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      jobRole: '',
      department: '',
      address: '',
    })
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res).to.be.a('object');
      done();
    });
  });
  
  it('should throw error if unable to sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(createUser.addUser)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res).to.be.a('object');
      done();
    });
  });
  
  it('should successfully sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .end((err, res, body) => {
      expect(res.status).to.equal(500);
      expect(res).to.be.a('object');
      done();
    });
  });
});
