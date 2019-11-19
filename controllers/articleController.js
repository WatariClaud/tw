import { pool } from '../config';

const checkTable = (req, res, next) => {
  const query = `CREATE TABLE articles (articleid SERIAL PRIMARY KEY,
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
    res.status(201).json({
      'status': 'success',
      'data': {
        'message': 'Article successfully posted',
        'title': title,
      }
    });
  });
};

const editArticle = (req, res) => {
  const _id = req.params.articleid;
  const title = req.body.title;
  const article = req.body.article;

  // if(typeof _id !== Number) {
  //   return res.status(403).json({
  //     'error': 'bad request'
  //   })
  // }

  pool.query(`SELECT * FROM articles WHERE articleid = ${_id}`, (error, success) => {
    if(error) throw error;
    if(success.rows.length < 1) {
      res.status(403).json({
        'message': 'unable to find article',
      })
    }
    if(!title) {
      pool.query('UPDATE articles SET article = $1 WHERE articleid = $2 RETURNING *', [article, _id], (er, re) => {
        if(er) throw er;
          res.status(201).json({
            'message': 'article updated successfully',
          });
      });
    } else {
      pool.query('UPDATE articles SET title = ($1) WHERE articleid = ($2) RETURNING *', [title, _id], (e, ok) => {
        if(e) throw e;
          res.status(201).json({
            'message': 'article title updated successfully',
          });
      });
    }
  })
};

const deleteArticle = (req, res) => {
  const _id = req.params.articleid;

  pool.query(`SELECT * FROM articles WHERE articleid = ${_id}`, (error, result) => {
    if(error) throw error;
    if(result.rows.length < 1) {
      res.status(403).json({
        'error': 'unable to find article',
      });
    } else {
      pool.query(`DELETE FROM articles WHERE articleid = ${_id}`, (e, r) => {
        if(e) throw e;
        res.status(201).json({
          'success': true,
          'data': {
            'message': 'successfully deleted article',
          }
        })
      })
    }
  })
};

const viewSpecificArticle = (req, res) => {
  const _id = req.params.articleid;
  pool.query('SELECT * FROM articles WHERE articleid = ($1)', [_id], (err, result) => {
    if(err) throw err;
    if(result.rows.length < 1) {
      return res.status(404).json({
        'error': 'not found',
      })
    }
    res.status(200).json({
      'success': true,
      'data': {
        'message': 'article retrieved successfully',
        'article': result.rows,
      }
    });
  });
};

export default {
  checkTable,
	createArticle,
  editArticle,
  deleteArticle,
  viewSpecificArticle,
}
