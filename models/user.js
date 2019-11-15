import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

let hashed;

bcrypt.hash('password', 10, (err, hash) => {
  hashed = hash;
})

const userModel = {
  nonAdmin: {
    firstName: 'user',
    lastName: 'sample',
    email: 'example@mail.com', 
    password: '12345678', 
    gender: 'male', 
    jobRole: 'model user', 
    department: 'tw', 
    address: 'no address',
    admin: false,
  },
  user1: {
    firstName: '',
    lastName: '',
    email: '', 
    password: '', 
    gender: '', 
    jobRole: '', 
    department: '', 
    address: '',
  },
  user2: {
    firstName: 'Claud',
    lastName: 'Watari',
    email: 'claud@example.com', 
    password: 'password', 
    gender: 'male', 
    jobRole: 'Developer', 
    department: 'Engineering', 
    address: 'Nairobi',
    admin: false,
  },
  user3: {
    firstName: 'Claud',
    lastName: 'Watari',
    email: 'claudwatari@gmail.com', 
    password: hashed, 
    gender: 'male', 
    jobRole: 'Developer', 
    department: 'Engineering', 
    address: 'Nairobi',
    admin: true,
  },
  user4: {
    firstName: 'Claud',
    lastName: 'Watari',
    email: 'claudk@gmail.com', 
    password: hashed, 
    gender: 'male', 
    jobRole: 'Developer', 
    department: 'Engineering', 
    address: 'Nairobi',
    admin: false,
  }
};

export default userModel;