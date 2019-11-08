import chai from 'chai';

import jwt from 'jsonwebtoken';

import chaiHttp from 'chai-http';

import server from '../source/server';

import authAdmin from '../auth/auth';

const should = chai.should();

const expect = chai.expect;

chai.use(chaiHttp);

describe('Authenticate admin', () => {

  it('should unauthorize access if not admin', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(authAdmin.token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res).to.be.a('object');
        done();
      });
      done();
  });

});