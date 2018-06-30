'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 app.use(bodyParser.json({limit:'1gb'}));
const logger = require('morgan');
const router = express.Router();
const cors = require('cors')

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
 app.disable('etag');

require('./routes')(router);
app.use('/', router);
app.set('view engine', 'pug')
app.listen(port);

console.log(`App runs on ${port}`);


