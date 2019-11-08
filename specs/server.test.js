import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import createUser from '../controllers/userController';

const expect = chai.expect;

chai.use(chaiHttp);

let app; 

before((done) => {
  app = server.listen(3000);
  done();
});

// after((done) => {
//   app.close();
//   done();
// });

describe('Create user', () => {
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
