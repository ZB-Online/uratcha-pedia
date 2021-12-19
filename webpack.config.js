const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['./public/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './public/js/index.js')],
        exclude: [/node_modules/, /server/],
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'assets/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ],
  devtool: 'source-map',
  mode: 'development',
  // mode: "production",
  // output: {
  //   filename: "main.[contentHash].js",
  //   path: path.resolve(__dirname, "dist")
  // },
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    port: 7979,
    // open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7979',
        changeOrigin: true,
      },
      secure: false,
    },
  },
};
