const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    // test: "mocha!./test/index.js"
    test: 'sinon/pkg/sinon.js'
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js",
  },
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.scss$/,
      loader: "style!css!sass"
    }, {
      test: /sinon\/pkg\/sinon\.js/,
      loader: "imports?define=>false,require=>false"
    }]
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon.js',
    },
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};
