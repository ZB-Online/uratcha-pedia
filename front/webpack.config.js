const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      Images: path.resolve(__dirname, 'src/img/'),
      App$: path.resolve(__dirname, 'src/js/App.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src/js/index.js')],
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  proposals: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'development',
    }),
  ],
  // devtool: 'inline-source-map',
  // mode: 'production',
  mode: 'development',
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:7979',
        changeOrigin: true,
      },
      secure: false,
    },
  },
};
