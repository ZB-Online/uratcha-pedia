const express = require('express');

const app = express();
const PORT = 5500;

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.set('port', PORT);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
