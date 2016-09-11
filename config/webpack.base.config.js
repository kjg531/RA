import path from 'path';
import webpack from 'webpack';


module.exports = (opts) => {

  const {PROJECT_ROOT, NODE_ENV} = opts;

  let plugins = [
    // add all common plugins here
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    // Promise and fetch polyfills
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ];
  if (NODE_ENV !== 'test') {
    // karma webpack can't use these
    plugins = [
      ...plugins,
      // vendor chuncks
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor-[hash].js',
      }),
      // shared stuff between chuncks
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common-[hash].js',
        chunks: [],  // add common modules here
      }),
    ];
  }

  return {
    context: PROJECT_ROOT,

    entry: {
      main: path.resolve(PROJECT_ROOT, 'redditalpha/static/redditalpha/index'),
      vendor: ['react', 'redux', 'react-router', 'react-redux', 'react-dom'],
    },

    output: {
      path: path.resolve(PROJECT_ROOT, 'redditalpha/static/redditalpha/bundles'),
      filename: '[name]-[hash].js',
    },

    plugins,

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
        {test: /\.scss$/, loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap' },
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: {limit: 8192}},  // inline base64 URLs <=8k
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
      ], // add all common loaders here
    },
    watchOptions: {
      poll: 400
    },
    sassLoader: {
      data: '@import "' + path.resolve(__dirname, '../redditalpha/static/redditalpha/theme/_theme.scss') + '";'
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        path.resolve(PROJECT_ROOT, 'redditalpha/static/redditalpha'),
        'node_modules',
      ],
    },
  };
};
