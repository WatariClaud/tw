import dotenv from 'dotenv';

import cloudinaryModule from 'cloudinary';

import readChunk from 'read-chunk';

import fileType  from 'file-type';

import { pool } from '../config';

dotenv.config();

const cloudinary = cloudinaryModule.v2;

const checkTable = (req, res, next) => {
  const query = `CREATE TABLE gifs (gifId SERIAL PRIMARY KEY,
    title VARCHAR(30), imageurl VARCHAR(255), createdOn DATE DEFAULT CURRENT_DATE)`;

  pool.query(query, (err, res) => {
    if(err) throw err;
    else next();
  });
};

const cloudinaryUser = cloudinary.config({cloud_name: "dzdqe8iow", 
  api_key: "463172811329134", 
  api_secret: process.env.Cloudinary_Secret                       
});

const addGif = (req, res) => {
  const { 
  	      title, 
  	      image
  	    } = req.body;
  
  if(!title || !image) {
    return res.status(409).json({
      'message': 'title and image required',
    })
  }

  const buffer = readChunk.sync(image, 0, fileType.minimumBytes);

  if(fileType(buffer).ext !== 'gif') {
    return res.status(409).json({
      'message': 'Only gif files supported',
    })
  }

  pool.query('INSERT INTO GIFS (title, imageurl) VALUES ($1, $2)', [title, image], (error, result) => {
    if(error) throw error;

    cloudinary.uploader.upload(image, {
      use_filename: true, 
      unique_filename: false,
      'crop': 'limit',
      'tags': 'teamwork',
      'width': 3000,
      'height': 2000
    })
    .then((file) => {
      console.log('Image', file, 'uploaded');
    })
    .catch((err) => {
      res.status(400).json({
       'error': error
      })
    });

    res.status(201).json({
      'success': true,
      'data': {
        'message': 'gif added successfully',
        'createdOn': new Date().getTime(),
        'title': image,
      }
    });
  });
};

const deleteGif = (req, res) => {
  let onlyImage;
  const _id = req.params.gifId;
   pool.query(`SELECT * FROM gifs WHERE gifId = ${_id}`, (error, result) => {
    console.log(result.rows)
    if(result.rows[0].imageurl.split('/').length > 1) {
      onlyImage = result.rows[0].imageurl.split('/')[1];
    } else { 
      onlyImage = result.rows[0].imageurl
    }
    onlyImage = onlyImage.split('.')[0];
    if(error) throw error;
    if(result.rows.length < 1) {
      res.status(403).json({
        'error': 'unable to find article',
      });
    } else {
      pool.query(`DELETE FROM gifs WHERE gifId = ${_id}`, (e, r) => {
        if(e) throw e;
        res.status(201).json({
          'success': true,
          'data': {
            'message': 'successfully deleted gif',
          }
        })
        cloudinary.uploader.destroy(onlyImage, (errorDeleteing, result) => {
          if(errorDeleteing) console.log(errorDeleteing);
          console.log(result);
        })
      })
    }
  });
};

const viewSpecificGif = (req, res) => {
  const _id = req.params.gifId;
  pool.query('SELECT * FROM gifs WHERE gifId = ($1)', [_id], (err, result) => {
    if(err) throw err;
    if(result.rows.length < 1) {
      return res.status(404).json({
        'error': 'not found',
      })
    }
    res.status(201).json({
      'success': true,
      'data': {
        'message': 'gif retrieved successfully',
        'gif': result.rows[0],
      }
    });
  });
}

export default {
  checkTable, addGif, deleteGif, viewSpecificGif
}


