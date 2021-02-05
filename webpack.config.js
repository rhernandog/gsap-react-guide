const path = require("path");
const fs = require("fs");
var url = require("url");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const htmlPlugin = require("html-webpack-plugin");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const bSync = require("browser-sync-webpack-plugin");

/*
*******************************************************************************************
		ФУНКЦИЯ ПРОМЕЖУТОЧНОГО ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ СИНХРОНИЗАЦИИ БРАУЗЕРА
*******************************************************************************************
*/
/* Более подробную информацию об этом промежуточном программном обеспечении можно найти здесь:
 * https://github.com/BrowserSync/browser-sync/issues/204
 * Более подробное объяснение этой конкретной функции в этом комментарии:
 * https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-362091190
 */
// файл по умолчанию, если маршрут не является корневым URL
var defaultFile = "index.html";
// папка для скомпилированных файлов
var compiledFolder = path.resolve(__dirname, "./build");
/** Функция промежуточного программного обеспечения
 * Используется, чтобы избежать ошибок, когда пользователь перезагружает браузер
 * или браузер перезагружается, потому что был сгенерирован новый файл компиляции.
 * @private
 */
var bSyncMiddleware = function (req, res, next) {
  // name of the requested file
  var fileName = url.parse(req.url).pathname;
  // проверьте, существует ли файл в скомпилированной папке
  var fileExists = fs.existsSync(compiledFolder + fileName);
  // проверьте, ищем ли мы файл .ico
  var iconTest = fileName.match(/\/favicon\.ico/g);
  // проверьте, находится ли запрошенный файл во вложенной папке.
  // ищите две косые черты
  var subfolderTest = fileName.match(/\//g).length > 1;
  // проверяем, является ли запрошенный файл файлом css или js
  // в этом случае мы проверяем, попадает ли запрос в одну из подпапок
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
    } // subfolder file conditional
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
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
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
      // применить промежуточное ПО, чтобы избежать ошибок перезагрузки
      middleware: bSyncMiddleware
    })
  ],
  // output
  output: {
    path: path.join(__dirname, "public"),
    filename: "js/[name]-[hash].js"
  },
  // watch
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
