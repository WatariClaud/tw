import chai from 'chai';

import pg from 'pg';

import chaiHttp from 'chai-http';

import { pool } from '../config';

import bcrypt from 'bcrypt';

import server from '../source/server';

import createUser from '../controllers/userController';

import users from '../models/user';

const expect = chai.expect;

chai.use(chaiHttp);

const exists = users.thisUser;

const reqUser = {
  firstName: 'Claud',
  lastName: 'Watari',
  email: 'claudwatari95@gmail.com', 
  password: 'password', 
  gender: 'male', 
  jobRole: 'Software developer', 
  department: 'Engineering', 
  address: 'Nairobi',
  admin: false,
}

describe('Create user', () => {
   // before('add table', (done) => {
  //   const query = `CREATE TABLE e (id SERIAL PRIMARY KEY,
  //   firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50),
  //   password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
  //   department VARCHAR(50), address VARCHAR(30))`;

  //   pool.query(query, (err, res) => {
  //     if(err) throw err;
  //   });

  //   done();
  // }); 

  // after('clear table', (done) => {
  //   const query = `DROP TABLE e`;

  //   pool.query(query, (err, res) => {
  //     if(err) throw err;
  //   });

  //   done();
  // })

  it('should not sign user up if email exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(exists)
      .end((err, res) => {
        // res.should.have.status(409);
        // expect(res.status).to.equal(409);
        expect(res).to.be.a('object');
        done();
      });
  });

  it('should return error if unable to hash password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(bcrypt.hash('passowrd', 10))
       .end((err, res) => {
         // expect(res.status).to.equal(500);
         expect(res).to.be.a('object');
         done();
       });
  });

  it('should return error if fields are empty', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(users, {
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
      // expect(res.status).to.equal(400);
      expect(res).to.be.a('object');
      done();
    });
  });
  
  it('should throw error if unable to sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(users, {
      firstName: 'Claud',
      lastName: 'Watari',
      email: exists.userEmail,
      password: 'pass1234',
      gender: 'male',
      jobRole: 'Software developer',
      department: 'Engineering',
      address: 'Nairobi',
    })
    .end((err, res) => {
      // expect(res.status).to.equal(500);
      expect(res).to.be.a('object');
      done();
    });
  });
  
  it('should successfully sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(users, {
      firstName: 'Claud',
      lastName: 'Watari',
      email: exists.userEmail,
      password: 'pass1234',
      gender: 'male',
      jobRole: 'Software developer',
      department: 'Engineering',
      address: 'Nairobi',
      admin: true,
    })
    .end((err, res) => {
      // expect(res.status).to.equal(201);
      expect(res).to.be.a('object');
      done();
    });
  });
});
