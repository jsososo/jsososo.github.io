const rest = require('restler');
const path = require('path');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const argv = require('../argv');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;
  if (argv.type == 'online') {

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });

  } else {
    let cb = (req, res) => {
      try {
        let filename;
        if (/^get$/i.test(req.method)) {
          filename = req.params.apiName || req.query.apiName;
        } else {
          filename = req.body.apiName;
        }
        let modulePath = path.join(process.cwd(), 'mock', filename + '.js');
        require.cache[require.resolve(modulePath)] && delete require.cache[require.resolve(modulePath)];
        let _method = require(modulePath);
        let data = _method();
        res.send(data);
      } catch (e) {
        res.sendStatus(404);
      }
    };
    //.rjson结尾的GET请求
    app.get('*.rjson$', cb);

    //.rjson结尾的POST请求
    app.post('*.rjson$', cb);

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });
  }

};
