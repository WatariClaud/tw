import chai from 'chai';

import chaiHttp from 'chai-http';

import bcrypt from 'bcrypt';

import server from '../source/server';

const expect = chai.expect;
chai.use(chaiHttp);

const userModel = {
  user1: {
    email: '',
    password: '',
  },
  user2: {
    email: 'claudk@mail.com',
    password: 'password',
  },
  user3: {
    email: 'claud@mail.com',
    password: 'hashed',
  },
};

describe('login', () => {
  it('should not login a user if credentials missing', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .send(userModel.user1)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    })
  });
  it('should not login a user if invalid email', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .send(userModel.user2)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('should return error if unable to verify password', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .send(userModel.user3)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      done();
    });
  });
});