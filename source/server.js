import express from 'express';

import router from '../routes/routes';

import bodyParser from 'body-parser';

import cors from 'cors';

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})
app.use(express.json());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);

app.listen(process.env.PORT || 4000, () => {
	console.log('Listening on port 4000');
    app.emit("app running");
});

export default app;
