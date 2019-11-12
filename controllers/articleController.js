import { pool } from '../config';

const checkTable = (req, res, next) => {
  const query = `CREATE TABLE articles (articleId SERIAL PRIMARY KEY,
    title VARCHAR(30), article VARCHAR(255), createdOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

const createArticle = (req, res) => {
  const { title, article } = req.body;

  if(!title || !article) {
    return res.status(409).json({
      'message': 'Article title and content required',
    })
  }

  const query = 'INSERT INTO articles (title, article) VALUES ($1, $2) RETURNING *';
  const values = [ title, article ];

  pool.query(query, values, (error, result) => {
    if (error) {
      return res.status(500).json({
      	error: error
      });
    }

    const lastObj = pool.query('SELECT * FROM articles ORDER BY articleId DESC LIMIT 1', (caught, ok) => {
      if(caught) throw caught;
      res.status(201).json({
        'status': 'success',
        'data': {
          'message': 'Article successfully posted',
          'articleId': ok.rows[0].articleId + 1,
          'title': title,
        }
      });
    });
    
  });
};

export default {
  checkTable,
	createArticle,
}
