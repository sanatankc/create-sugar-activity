const path = require('path')
const SugarPlugin = require('./sugarplugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new SugarPlugin({options: true})
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        loader : 'babel-loader'
      }
    ]
  },
  watch: true,
}