import pg from 'pg';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import role from '../roles';

import { pool } from '../config';

dotenv.config();

const checkTable = (req, res, next) => {
  const query = `CREATE TABLE users (id SERIAL PRIMARY KEY,
    firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50) UNIQUE,
    password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
    department VARCHAR(50), address VARCHAR(30), admin VARCHAR(11))`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
}

const createUser = (req, res, next) => {
  const { 
          firstName, 
          lastName, 
          email, 
          password, 
          gender, 
          jobRole, 
          department, 
          address 
        } = req.body;

  const signUp = pool.query('SELECT * FROM users WHERE email = $1', [email], (e, r) => {
    if(e) throw e;
    else {
      if(r.rows.length > 0) {
        return res.status(500).json({
          'message': 'unable to sign up',
        });
      } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            return res.status(503).json({
              error: err
            });
          } else {
            if(!req.body.firstName) {
              return res.status(409).json({
                'success': 'false',
                'message': 'first name is required'
              });
            } else if(!req.body.lastName) {
              return res.status(409).json({
                'success': 'false',
                'message': 'last name is required'
              });
            } else if(!req.body.email) {
              return res.status(409).json({
                'success': 'false',
                'message': 'email is required'
              });
          } else if(!req.body.password) {
            return res.status(409).json({
              success: 'false',
              message: 'password is required'
            });
          } else if(!req.body.gender) {
            return res.status(409).json({
              success: 'false',
              message: 'gender is required'
            });
          } else if(!req.body.jobRole) {
            return res.status(409).json({
              success: 'false',
              message: 'job role is required'
            });
          } else if(!req.body.department) {
            return res.status(409).json({
              success: 'false',
              message: 'department is required'
            });
          } else if(!req.body.address) {
            return res.status(409).json({
              success: 'false',
              message: 'address is required'
            });
          }
          
          const token = jwt.sign({
            email: email,
            admin: false,
          }, process.env.secret_token, {
            expiresIn: '1h',
          });

          const query = `INSERT INTO 
                         users 
                         (firstName, 
                         lastName, 
                         email, 
                         password, 
                         gender, 
                         jobRole, 
                         department, 
                         address,
                         admin) 
                         VALUES 
                         ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                         RETURNING *`;
          
          const values = [
                           firstName, 
                           lastName, 
                           email, 
                           hash, 
                           gender, 
                           jobRole, 
                           department, 
                           address,
                           false
                         ];
          
          const addUser = pool.query(query, values, (error, result) => {
            if(error) {
              return res.status(500).json({
                error: error
              });
            }
            return res.status(201).json({
              'status': 'success',
              'data': {
                'message': 'user account successfully created',
                'token': token,
              }
             });
          });
        }
      });
      }
    }
  });
};

const logIn = (req, res, next) => {
  if(!req.body.email) {
    return res.status(409).json({
      success: 'false',
      message: 'email is required'
    });
  } else if(!req.body.password) {
    return res.status(409).json({
      success: 'false',
      message: 'password is required'
    });
  } 
  const userEmail = req.body.email;
  const userPass = req.body.password;
  pool.query('SELECT * FROM users WHERE email = ($1)', [userEmail], (error, reslt) => {
    if(error) throw error;
    if(reslt.rows.length < 1) {
      return res.status(401).json({
       'message': 'auth failed! invalid email'
      });
    }
    bcrypt.compare(userPass, reslt.rows[0].password, (err, result) => {
      console.log(err);
      console.log(result);
      if(err) {
        return res.status(401).json({
          'message': 'auth failed! validation error',
          'error': err,
        });
      }
      if(result) {
        const token = jwt.sign({
          email: reslt.rows[0].email,
          id: reslt.rows[0].id,
          admin: reslt.rows[0].admin,
        }, process.env.secret_token, {
          expiresIn: '1h'
        });
        return res.status(200).json({
          'status': 'success',
          'data': {
            'token': token,
            'userId': reslt.rows[0].id,
          }
        })
        // next();
      } else {
        res.status(401).json({
          'error': 'auth failed! invalid password',
        })
      }
    });
  });
};

export default {
  checkTable, createUser, logIn
};