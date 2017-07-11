const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	devtool: "eval-inline-source-map",
	entry: {
		main: ["./src"],
		vendor: ["react", "react-dom" ]
	},
	output: {
		// devtoolLineToLine: true,
		// sourceMapFilename: "index_bundle.js.map",
		path: path.resolve('build'),
		filename: 'index_bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, 
				  {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }]
	},
	plugins: [HtmlWebpackPluginConfig,
		// new webpack.optimize.AggressiveMergingPlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: { warnings: false },
		// 	comments: false,
		// 	mangle: true,
		// 	minimize: true,
		// 	sourceMap: false
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js"
		})
	]
}