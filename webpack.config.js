/**
 * Created by sschindler on 31.03.16.
 */
var path = require('path');
var webpack = require('webpack');
var config = module.exports = {
    // the base path which will be used to resolve entry points
    context: __dirname,
    // the main entry point for our application's frontend JS
    entry: {
      client:'./frontend/client/index.coffee',
      search:'./frontend/search/index.js'
    },
};
config.output = {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'app', 'assets', 'javascripts', 'bundles'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: "[name]-bundle.js",
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets',
};
config.resolve = {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` snstead of `require('./utils.js')`
    extensions: ['', '.js', '.coffee', '.jsx'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    //modulesDirectories: [ 'node_modules', 'bower_components' ],
};
/*
config.plugins = [
    // we need this plugin to teach webpack how to find module entry points for bower files,
    // as these may not have a package.json file
    new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ])
];
*/
config.module = {
    loaders: [
      {
        test : /\.jsx$/,
        loader : 'babel',
        exclude : /node_modules/,
        query : {
          presets : ['es2015', 'react']
        }
      },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"}
    ]
};
