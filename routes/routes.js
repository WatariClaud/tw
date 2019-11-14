import express from 'express';

import authAdmin from '../auth/auth';

import checkToken from '../auth/checkToken';

import userController from '../controllers/userController';

import gifController from '../controllers/gifController';

import articleController from '../controllers/articleController';

import commentController from '../controllers/commentController';

import feedController from '../controllers/feedController';

const router = express.Router();
// const app = express();

router.post('/api/v1/auth/create-user', authAdmin, userController.createUser);
router.post('/api/v1/auth/signin', userController.logIn);
router.post('/api/v1/gifs', checkToken, gifController.addGif);
router.post('/api/v1/articles', checkToken, articleController.createArticle);
router.patch('/api/v1/articles/:articleid', checkToken, articleController.editArticle);
router.delete('/api/v1/articles/:articleid', checkToken, articleController.deleteArticle);
router.delete('/api/v1/gifs/:gifId', checkToken, gifController.deleteGif);
router.post('/api/v1/gifs/:gifId/comments', checkToken, commentController.addGifComment);
router.post('/api/v1/articles/:articleid/comments', checkToken, commentController.addArticleComment);
router.get('/api/v1/feed', checkToken, feedController.showFeed);
router.get('/api/v1/gifs/:gifId', checkToken, gifController.viewSpecificGif);
router.get('/api/v1/articles/:articleid', checkToken, articleController.viewSpecificArticle);

export default router;
