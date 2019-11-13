import dotenv from 'dotenv';

import { pool } from '../config';

dotenv.config();

const checkTableGifs = (req, res, next) => {
  const query = `CREATE TABLE gifs (gifId SERIAL PRIMARY KEY,
    title VARCHAR(30), imageurl VARCHAR(255), createdOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

const checkTableArticles = (req, res, next) => {
  const query = `CREATE TABLE articles (articleid SERIAL PRIMARY KEY,
    title VARCHAR(30), article VARCHAR(255), createdOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

const showFeed = (req, res) => {
  pool.query('SELECT * FROM gifs UNION SELECT * FROM articles ORDER BY createdOn ASC', (error, results) => {
    if(error) throw error;
    res.status(200).json({
      'success': true,
      'data': {
        'feed': results.rows,
      }
    });
  });
};

export default {
	checkTableGifs, checkTableArticles, showFeed
}