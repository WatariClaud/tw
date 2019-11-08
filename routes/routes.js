import express from 'express';

import authAdmin from '../auth/auth';

import userController from '../controllers/userController';

// const router = express.Router();
const app = express();

app.post('/api/v1/auth/create-user', userController.createUser);

export default app;
