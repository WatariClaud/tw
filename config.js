import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error
}

console.log(result.parsed);

const secret = process.env.secret;

const dbHost = process.env.DbH;

const dbUser = process.env.dbUser;

const dbName = process.env.dbName;

const dbPass = process.env.dbPass;

const dbPort = process.env.dbPort;

export default secret;