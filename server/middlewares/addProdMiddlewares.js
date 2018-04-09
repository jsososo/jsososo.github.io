const rest = require('restler');
const path = require('path');
const express = require('express');
const compression = require('compression');
const argv = require('../argv');
module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  if(argv.type=='online'){
    app.get('*.rjson$', (req, res) => {
      rest.get("http://"+argv.ip+req.path, {
        headers:req.headers
      }).on('complete',function(data){
        res.send(data)
      })
    });
    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

  }else {
    app.get('*.rjson$', (req, res) => {
      try {
        let filename = req.url.split("?")[1].split("=")[1]
        let modulePath = path.join(process.cwd(), 'mock', filename+'.js');
        require.cache[require.resolve(modulePath)] && delete require.cache[require.resolve(modulePath)];
        let _method = require(modulePath);
        let data = _method();
        res.send(data);
      } catch(e) {
        res.sendStatus(404);
      }
    });
    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
  }
};
