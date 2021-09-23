const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', //production
  entry: {
    // toto (or what you want) is the name of the entry used in [filename] 
    toto: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // contenthash generate a hash (usefull for browser avoid cach problems)
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]', // here the name is the module name imported in component.ts (logo)
    clean: true, // used to clean exitant previous generated file
  },
  devtool: 'inline-source-map', // displays original files (for debug)
  devServer: {
    // static: path.resolve(__dirname, 'dist'),
    port: 5001, //default 8080
    open: true, // open tab on browser
    hot: true, // compile and refresh tab on src files change
    watchContentBase: true, // watch dist directory changes for refresh
  },
  //loaders: for loading modules in dist
  module: {
    rules: [
      //css : : transformes css to modules that it can be imported in js
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //images : transformes images to modules that it can be imported in js
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      //js for babel
      {
        test: /\.js$/,  // regex
        exclude: /node_modules/, // regex
        use: {
          loader: 'babel-loader',  // uses babel-core
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  //plugins : this plugins generate a html file based on a template
  plugins: [
    new HtmlWebpackPlugin({
      // those properties are eaccessible on the template <%= %>. See temp.html
      title: 'Just a Demo',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/temp.html'),
    }),
  ],
};
