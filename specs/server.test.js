// import chai from 'chai';

// import chaiHttp from 'chai-http';

// import server from '../source/server';

// chai.should();

// chai.use(chaiHttp);

// describe('Create User', () => {

//   it('should add a new user', (done) => {
//     chai.request(server)
//       .post('/api/v1/auth/create-user')
//       .end((err, res) => {
//       	if(err) throw err;

//         res.should.have.status(201);
//         res.body.should.be.a('object');
//       });
//     done();
//   });
// });


import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../source/server';

import createUser from '../controllers/userController';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Create user', () => {
  it('should not sign user up if email exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(createUser.signUp)
      .end((err, res) => {
        // res.should.have.status(409);
        expect(res.status).to.equal(409);
        expect(res).to.be.a('object');
        done();
      });
      done();
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
      done();
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
      expect(res.status).to.equal(409);
      expect(res).to.be.a('object');
      done();
    });
    done();
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
    done();
  });
  
  it('should successfully sign user up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/create-user')
    .send(createUser.success)
    .end((err, res, body) => {
      expect(res.status).to.equal(201);
      expect(res).to.be.a('object');
      done();
    });
    done();
  });
});

//   

//   it('should return error if last name is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if email is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if password is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if gender is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if jobRole is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if department is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if address is empty', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(401);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should return error if unable to add user', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(500);
//       expect(res).to.be.a('object');
//     });
//   });

//   it('should successfully sign up user', () => {
//     chai.request(server)
//     .post('/api/v1/auth/create-user')
//     .send(createUser)
//     .end((err, res) => {
//       expect(res.status).to.equal(201);
//       expect(res).to.be.a('object');
//     });
//   });

// });
