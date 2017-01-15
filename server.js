/* jshint esversion: 6, node: true */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const mongodbUri = 'mongodb://kevino:fymynu9i@ds137267.mlab.com:37267/nomnom';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

const endpoint = '/api/games';
const routesPath = './api/games/routes/'

app.use(endpoint, require(routesPath + 'post_game'));
app.use(endpoint, require(routesPath + 'get_games'));
app.use(endpoint, require(routesPath + 'get_game'));
app.use(endpoint, require(routesPath + 'delete_game'));
app.use(endpoint, require(routesPath + 'put_game'));


const hostname = 'localhost';
const port = 3001;

const server = app.listen(port, hostname, () => {
  mongoose.connect(mongooseUri, dbOptions, (err) => {
      if(err) {
        console.log(err);        
      }
      console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});



