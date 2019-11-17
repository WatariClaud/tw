import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

import { pool } from '../config';

const checkTableGifs = (req, res, next) => {
  const query = `CREATE TABLE gifComments (commentId SERIAL PRIMARY KEY,
    comment VARCHAR(30), madeBy VARCHAR(50), Ogif VARCHAR(255),
    commentedOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

const checkTableArticles = (req, res, next) => {
  const query = `CREATE TABLE articleComments (commentId SERIAL PRIMARY KEY,
    comment VARCHAR(30), madeBy VARCHAR(50), Oarticle VARCHAR(255),
    commentedOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

let loggedUser;

const checkUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  const decoded = jwt.decode(token, {complete: true});
  const user = decoded.payload;
  loggedUser = user.email;
  next();
}

const addGifComment = (req, res) => {
  const OgifId = req.params.gifId;
  const comment = req.body;
  if(!comment) {
    res.status(409).json({
      'message': 'comment required',
    });
  }

  pool.query('SELECT * FROM gifs WHERE gifId = $1', [OgifId], (err, result) => {
    if(err) throw err;
    if(result.rows.length < 1) {
      res.status(403).json({
        'error': 'unable to comment',
      })
    }
    pool.query('INSERT INTO gifComments (comment, madeBy, Ogif) VALUES ($1, $2, $3)', [comment, loggedUser, OgifId], (e, r) => {
      if(e) throw e;
      res.status(201).json({
        'success': true,
        'data': {
          'message': 'comment added successfully',
        }
      })
    })
  })
}

const addArticleComment = (req, res) => {
  const OarticleId = req.params.articleId;
  const comment = req.body;
  if(!comment) {
    res.status(409).json({
      'message': 'comment required',
    });
  }

  pool.query('SELECT * FROM article WHERE articleId = $1', [OarticleId], (err, result) => {
    if(err) throw err;
    if(result.rows.length < 1) {
      res.status(403).json({
        'error': 'unable to comment',
      })
    }
    pool.query('INSERT INTO gifComments (comment, madeBy, Oarticle) VALUES ($1, $2, $3)', [comment, loggedUser, OarticleId], (e, r) => {
      if(e) throw e;
      res.status(201).json({
        'success': true,
        'data': {
          'message': 'comment added successfully',
        }
      })
    })
  })
};

export default {
	addGifComment, addArticleComment
}