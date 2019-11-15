import express from 'express';
import router from '../routes/routes';
import bodyParser from 'body-parser';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
  next();
});

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
});

export default app;
