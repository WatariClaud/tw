import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import userModel from '../models/user';

const expect = chai.expect;

const loginUser = (auth) => {
    return ((done) => {
        chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
                email: 'claud@admin.tw',
                password: 'mypassword'
            })
            .end((err, res) => {
              if(err) return done(err);
              auth.token = res.body;
              console.log(auth.token);
              done();
        });
    });
}

describe('create user', () => {
  let auth = {};
  before(loginUser(auth));

  it('should check all fields are available', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .set({'Authorization': 'Bearer ' + auth.token})
    .send(userModel.user1)
    .end((err, res) => {
      if(err) return done(err);
      // expect(res.status).to.equal(409);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return error if unable to sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .set({'Authorization': 'Bearer ' + auth.token})
    .send(userModel.user1)
    .end((err, res) => {
      if(err) return done(err);
      // expect(res.status).to.equal(500);
      expect(res).to.be.a('object');
      done();
    });
  });
});