import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import userModel from '../models/user';

const expect = chai.expect;
chai.use(chaiHttp);

describe('create user', () => {
  it('should check all fields are available', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(userModel.user1)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    });
  });

  it('should return error if unable to hash password', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(userModel.user3)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      done();
    });
  });

  it('should return error if unable to save user', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(userModel.user4)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      done();
    });
  });
})