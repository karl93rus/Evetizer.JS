const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: false
  },
  devtool: "source-map",
  module: {
		rules: [
			{
				test: /(\.ts)$|(\.js)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
		]
	},
}