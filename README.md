[![Build Status](https://travis-ci.com/ClaudWatari95/tw.svg?token=DaepE415kiKy52GBGf6W&branch=develop)](https://travis-ci.com/ClaudWatari95/tw)

# TW
Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

## About teamwork app
This app is written using <a href = 'https://nodejs.org'>nodejs</a>/express and is expected to be written in <a href = 'https://reactjs.org
'>Reactjs</a> for fornt end component rendering. The database used is <a href = 'https://www.postgresql.org'>Postgresql</a>.
The testing framework used is <a href = 'https://mochajs.org'>MochaJs</a>

## Getting started
Clone the app by running 
```
> git clone https://github.com/ClaudWatari95/tw.git
```
You can also include a .env file to include your environment variables.

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
