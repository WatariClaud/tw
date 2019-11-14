import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

const expect = chai.expect;
chai.use(chaiHttp);

const gifModel = {
  gif1: {
		title: '',
		image: ''
  },
  gif2: {
		title: 'title',
		article: 'my article',
  },
}
describe('add gif', () => {
  it('should check article and title are available', (done) => {
    chai.request(server)
    .post('/api/v1/articles')
    .send(gifModel.gif1)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      if (err) return done(err);
      done();
    });
  });

  it('should upload article', (done) => {
    chai.request(server)
    .post('/api/v1/articles')
    .send(gifModel.gif2)
    .end((err, res) => {
      expect(res.status).to.equal(201);
      if (err) return done(err);
      done();
    });
  });
});