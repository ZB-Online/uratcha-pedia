const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './public/js/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './public/js/app.js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
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
  ],
  devtool: 'source-map',
  mode: 'development',
  // mode: "production",
  // output: {
  //   filename: "main.[contentHash].js",
  //   path: path.resolve(__dirname, "dist")
  // },
  devServer: {
    port: 5000,
    open: true,
    // proxy: {
    //   "/api": "http://localhost:8080"
    // },
  },
};
