/* jshint esversion: 6, node: true */

'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb://kevino:fymynu9i@ds137267.mlab.com:37267/nomnom';

const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




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



