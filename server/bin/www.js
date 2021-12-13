// express settings
const express = require('express');
const app = express();
const router = require('../routes/index');
const PORT = 7979;

// webpack settings
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(express.static('public'));
app.use(express.json());
app.use('/', router)

app.listen(PORT, () => console.log(`Dev Server listening on port ${PORT}!`))
