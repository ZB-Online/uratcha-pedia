const express = require('express');

const app = express();
const PORT = 3500;

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.get('/mypage', (req, res) => {
  console.log(req, res);

  res.format({
    'text/html': () => {
      res.sendFile(__dirname + '/public/index.html');
    },
    'application/json': () => {
      res.send({
        message: 'Hello World',
      });
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

app.get('/service', (req, res) => {
  console.log('36', req, res);
});

app.set('port', PORT);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
