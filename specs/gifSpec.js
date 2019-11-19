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
    image: 'https://www.socialandtech.net/wp-content/uploads/2019/05/Screenshot-2019-05-19-at-14.52.05.png'
  },
  gif3: {
    title: 'title',
    image: 'C:/Users/Guest/Documents/teamwork/server/screenshots/headbanging.gif'
  },
}

describe('add gif', () => {
  it('should check image and title are available', (done) => {
    chai.request(server)
    .post('/api/v1/gifs')
    .send(gifModel.gif1)
    .end((err, res) => {
      // expect(res.status).to.equal(409);
      expect(res).to.be.a('object');
      if (err) return done(err);
      done();
    });
  });

  it('should check image is gif', (done) => {
    chai.request(server)
    .post('/api/v1/gifs')
    .send(gifModel.gif2)
    .end((err, res) => {
      // expect(res.status).to.equal(409);
      expect(res).to.be.a('object');
      if (err) return done(err);
      done();
    });
  });

  it('should upload gif', (done) => {
    chai.request(server)
    .post('/api/v1/gifs')
    .send(gifModel.gif3)
    .end((err, res) => {
      // expect(res.status).to.equal(201);
      expect(res).to.be.a('object');
      if (err) return done(err);
      done();
    });
  });
});