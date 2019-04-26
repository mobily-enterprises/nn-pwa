var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var prpl = require('prpl-server')
let polyConfigFile = { ...require('./build/polymer.json'), forwardErrors: true }

var app = express();

var prplHandler = prpl.makeHandler('build', polyConfigFile)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/*', (req, res, next) => { prplHandler(req, res, next) })
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
