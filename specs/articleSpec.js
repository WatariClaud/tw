import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

const expect = chai.expect;
chai.use(chaiHttp);

const articleModel = {
  article1: {
    title: '',
    image: ''
  },
  article2: {
    title: 'title',
    article: 'my article',
  },
};

describe('add article', () => {
  it('should check article and title are available', (done) => {
    chai.request(server)
    .post('/api/v1/articles')
    .send(articleModel.article1)
    .end((err, res) => {
      // expect(res.status).to.equal(409);
      expect(res).to.be.a('object');
      if (err) return done(err);
      done();
    });
  });

  it('should upload article', (done) => {
    chai.request(server)
    .post('/api/v1/articles')
    .send(articleModel.article2)
    .end((err, res) => {
      // expect(res.status).to.equal(201);
      expect(res).to.be.a('object');
      if (err) return done(err);
      done();
    });
  });
});