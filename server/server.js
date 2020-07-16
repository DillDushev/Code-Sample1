const express = require('express');
const path = require('path');
const config = require('../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');

const bodyParser = require('body-parser');

const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleWare(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleWare(compiler));
app.use(express.static('files'));


app.use(bodyParser.json());

app.use(express.static('./dist'));
app.use(express.static('./assets'));
//app.use('/property', express.static(__dirname + '/assets'));
//app.use('/property/images', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(8080, (error) => {
  if (error) {
    throw error;
  }
});
