import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import authAdmin from '../auth/auth';

import { pool } from '../config';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Authenticate admin', () => {
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
