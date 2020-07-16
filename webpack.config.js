var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var SASS_DIR = path.resolve(__dirname,'client/web/sass/markers');//path.resolve(__dirname,'assets/sass');
var SRC_DIR = path.resolve(__dirname,'client');
var DIST_DIR = path.resolve(__dirname,'dist');

let publicPath =  '/w_assets/';
//options.devServer ?
  //  'http://' + (process.env.EXT_IP || '0.0.0.0') + ':' + (process.env.HOT_RELOAD_PORT || 3081) + '/w_assets/' :
  //  (process.env.SERVER_PATH || '') + 
   // '/w_assets/';


var config = {
	devtool:'inline-source-map',
	entry:[
		'webpack-hot-middleware/client',
		SRC_DIR + '/client.js'
	],
	output:{
		path:require('path').resolve(__dirname,'dist'),
		filename:'bundle.js',
		publicPath: '/',
		pathinfo: true
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	postcss: [
    	autoprefixer({ browsers: ['last 2 versions'] }),
  	],
	module:{
		loaders: [
			{
				test:/\.js?/, 
				//include:SRC_DIR,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets:['react','es2015','stage-2','react-hmre'],
					plugins:['transform-decorators-legacy']
				}
			},{
				test: /\.(jpe?g|png|gif)$/i,
			    loaders: [
			      'file',
			      'file-loader',
			      'url-loader'
			    ]
			},
			{
		        test: /\.sass$/,
		        loaders: [
		          'style-loader',
		          'css-loader',
		          'postcss-loader',
		          `sass-loader?precision=10&indentedSyntax=sass`,
		        ],
		    },{
		        test: /\.svg$/,
		        loaders: ['url-loader?limit=70000']
		    },
		]
	}
};

module.exports = config;