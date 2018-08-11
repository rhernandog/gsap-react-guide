const path = require("path");
const fs = require("fs");
var url = require("url");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const htmlPlugin = require("html-webpack-plugin");
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const bSync = require("browser-sync-webpack-plugin");

/*
*******************************************************************************************
		BROWSER SYNC MIDDLEWARE FUNCTION
*******************************************************************************************
*/
/* More information about this middleware can be found here:
 * https://github.com/BrowserSync/browser-sync/issues/204
 * More detailed explanation for this particular function in this comment:
 * https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-362091190
*/
// default file when the route is not the root url
var defaultFile = "index.html";
// the folder for the compiled files
var compiledFolder = path.resolve( __dirname, "./build");
/** Middleware function
 * Used to avoid errors when either the user reloads the browser
 * or the browser reloads because a new compile file has been generated.
 * @private
*/
var bSyncMiddleware = function (req, res, next) {
	// name of the requested file
	var fileName = url.parse(req.url).pathname;
	// check if the file exists in the compiled folder
	var fileExists = fs.existsSync(compiledFolder + fileName);
	// check if we're looking for an .ico file
	var iconTest = fileName.match(/\/favicon\.ico/g);
	// check if the requested file is in a subfolder.
	// look for two forward slashes
	var subfolderTest = fileName.match(/\//g).length > 1;
	// check if the requested file is a css or js file
	// in this case we check if the request goes to one of the 
	// subfolders
	var isCssJsFile = fileName.match(/\/css|\/js|\/img/g);

	// if the file doesn't exists or the request is not for a browser sync file
	// or is not a favicon file
	if (!fileExists && fileName.indexOf("browser-sync-client") && !iconTest) {
		// if the request is for a subfolder and the request is for a CSS|JS file
		// create a new filename removing everything previous to the folder names
		if (subfolderTest && isCssJsFile) {
			// create a new filename using the file type
			var newNameRegEx = new RegExp(isCssJsFile[0] + "(.+)", "g");
			// get the specific file route for the request
			var newFileName = fileName.match(newNameRegEx)[0];
			req.url = newFileName;
		} else {
			// the file doesn't exists and is not a CSS or JS file
			// means the request is for a route and not a file, load the index file
			req.url = "/" + defaultFile;
		}// subfolder file conditional
	} // file doesn't exist conditional
	// keep going
	return next();
};

module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.js"
	},
	module: {
		rules: [
			// babel
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			// css
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	devtool: "source-map",
	plugins: [
		new CleanObsoleteChunks(),
		new ManifestPlugin(),
		new CleanWebpackPlugin(["public/js/*.*"]),
		new htmlPlugin({
			template: "./src/template/index.html",
			filename: "index.html"
		}),
		new bSync({
			host: "localhost",
			port: 3000,
			server: {
				baseDir: ["./public"],
				index: "index.html"
			},
			// apply the middleware to avoid reload errors
			middleware: bSyncMiddleware
		})
	],
	// output
	output: {
		path: path.join( __dirname, "public"),
		filename: "js/[name]-[hash].js"
	},
	// watch
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	}
};
