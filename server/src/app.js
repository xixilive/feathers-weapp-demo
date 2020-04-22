const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const services = require('./services');
const authentication = require('./authentication');

const app = express(feathers());

app.configure(configuration());
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(authentication);
app.configure(services);

app.use(express.notFound());

module.exports = app;
