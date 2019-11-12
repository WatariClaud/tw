import express from 'express';

import authAdmin from '../auth/auth';

import checkToken from '../auth/checkToken';

import userController from '../controllers/userController';

import gifController from '../controllers/gifController';

import articleController from '../controllers/articleController';

const router = express.Router();
// const app = express();

router.post('/api/v1/auth/create-user', authAdmin, userController.createUser);
router.post('/api/v1/auth/signin', userController.logIn);
router.post('/api/v1/gifs', checkToken, gifController.addGif);
router.post('/api/v1/articles', checkToken, articleController.createArticle);
router.patch('/api/v1/articles/:articleid', checkToken, articleController.editArticle);

export default router;
