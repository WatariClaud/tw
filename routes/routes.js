import express from 'express';

import authAdmin from '../auth/auth';

import userController from '../controllers/userController';

const router = express.Router();
// const app = express();

router.post('/api/v1/auth/create-user', userController.createUser);
router.post('/api/v1/auth/signin', userController.logIn);

export default router;
