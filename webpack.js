var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var projectRoot = path.resolve(__dirname);
var appRoot = path.resolve(projectRoot, 'app');

var env = process.env.NODE_ENV || (process.env.NODE_ENV = 'development');

var devtool = '#cheap-module-eval-source-map';
var debug = true;
switch (env) {
  case 'production':
    devtool = '#source-map';
    debug = false;
    break;
  case 'development':
    devtool = '#eval-source-map';
    debug = true;
    break;
};

var config = {
  devtool: devtool,
  debug: debug,
  entry: {
    app: [
      'babel-polyfill',
      path.join(appRoot, 'index'), 
    ],
  },
  output: {
    path: path.join(projectRoot, 'public/dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread'],
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
    }, {
      test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=image/jpg"
    }, {
      test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=image/jpg"
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=application/vnd.ms-fontobject"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?mimetype=image/svg+xml"
    }]
  }
}


var WebpackDevServer = require("webpack-dev-server");
var port = 8089;
var compiler;
if (env !== 'production') {
  config.entry.app.unshift(
    'webpack-dev-server/client?http://localhost:' + port + '/',
    'webpack/hot/dev-server');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
    publicPath: 'http://localhost:' + port + '/',
    contentBase: './public/',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 300,
    },
    stats: 'normal',
  })
  server.listen(port, 'localhost', function() { });
} else {
  compiler = webpack(config);
  compiler.run(handleError);
  if (process.env.KEEP_PROCESS_FOR_PM2) {
    setInterval(function() {
      console.log(process.env.NODE_ENV);
    }, 1000*60*60*24);
  }
}

function handleError(err, stats) {
  console.log(stats.toString({
    colors: true,
    cached: false,
  }));
}


