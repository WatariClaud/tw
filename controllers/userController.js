import pg from 'pg';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import Users from '../db/userModel';

import role from '../roles';

import config from './config';

dotenv.config();

const Pool = pg.Pool;

const pool = new Pool({
  user: config.dbUser,
  host: config.DbH,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort,
});

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
	  		return res.status(409).json({
	  		  'message': 'unable to sign up',
	  		});
	  	} else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            return res.status(500).json({
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
          }, config.secret, {
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
                         isAdmin) 
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
            const success = res.status(201).json({
              // 'message': `User added with ID: ${result.insertId}`,
              'status': 'success',
              'data': {
                'message': 'user account successfully created',
                'token': token,
                // 'userId': result.rows[0].Id,
              }
             });
          });
        }
      });
	  	}
	  }
	});
};

const logIn = (req, res) => {
  if(!req.body.email) {
    return res.status(400).json({
      success: 'false',
      message: 'email name is required'
    });
  } else if(!req.body.email) {
    return res.status(400).json({
      success: 'false',
      message: 'password is required'
    });
  } 
  const userEmail = req.body.email;
  const validUser = pool.query('SELECT * FROM users WHERE email = ?', [userEmail]);
  if(!validUser) {
    return res.status(401).json({
    	'message': 'auth failed'
    })  ;
  } else {
    bcrypt.compare(req.body.password, validUser.password, (err, reult) => {
      if(err) {
      	return res.status(401).json({
      		'message': 'auth failed'
      	});
      } else if(result) {
        const token = jwt.sign({
        	email: validUser.email,
        	id: validUser.id,
        }, config.secret, {
          expiresIn: '1h'
        });
        return res.status(200).json({
        	'status': 'success',
        	'data': {
        	  'token': token,
        	  'userId': validUser.id,
        	}
        })
      }
    });
  }
};

export default {
	createUser, logIn
};
