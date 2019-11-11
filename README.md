[![Build Status](https://travis-ci.com/ClaudWatari95/tw.svg?token=DaepE415kiKy52GBGf6W&branch=develop)](https://travis-ci.com/ClaudWatari95/tw) [![Coverage Status](https://coveralls.io/repos/github/ClaudWatari95/tw/badge.svg?branch=develop)](https://coveralls.io/github/ClaudWatari95/tw?branch=develop)

# TW
Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

## About teamwork app
This app is written using <a href = 'https://nodejs.org'>nodejs</a>/express and is expected to be written in <a href = 'https://reactjs.org
'>Reactjs</a> for front end component rendering. The database used is <a href = 'https://www.postgresql.org'>Postgresql</a>.
The testing framework used is <a href = 'https://mochajs.org'>MochaJs</a>

## Getting started
Clone the app by running 
```
git clone https://github.com/ClaudWatari95/tw.git
```
You can also include a .env file to include your environment variables.

Install dependencies by running
```
$ npm install
```

Start the server by running 
```
$ npm start
```
To run mocha tests, run 
```
$ npm test
```

## API Endpoints

| URL                    | HTTP Method | Description                 |
| -------------------------------- | ------- | --------------------------- |
| /api/v1/auth/create-user                   | POST    | Create an account           |
| -------------------------------- | ------- | --------------------------- |
| /api/v1/auth/signin                   | POST    | Log In to account           |


### Screenshots

Postgresql database and tables have been created through the command line as seen below

<img src = 'https://github.com/ClaudWatari95/tw/blob/develop/screenshots/psql-create-table.png' alt = 'create_psql_table'>

Due to the owner's pc's inability to install postman's ms c++, HTTP commands have been tested via <a href = 'https://curl.haxx.se'>curl</a> on the command line.

#### sign up
<img src = 'https://github.com/ClaudWatari95/tw/blob/develop/screenshots/curl-signup.png' alt = 'sign_up_screenshot'>

#### log in
<img src = 'https://github.com/ClaudWatari95/tw/blob/develop/screenshots/curl-login.png' alt = 'login_screenshot'>