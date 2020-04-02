const config = require("config");
const path = require('path');
const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

module.exports = {
  runServer: () => {
    const app = express();

    app.use((req, res, next) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', '*');
      next();
    });

    // app.options('/*', (req, res) => {
    //   res.end();
    // });

    // app.use(express.static(path.join(__dirname,'../..'));
          // res.sendFile(path.join(__dirname, "client", "index.html"));
      // res.send("./ : ", path.resolve("./"));

    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
    });

    // app.get('/', function(req, res) {
    //   res.sendFile(path.join(__dirname, 'client', 'index.html'));
    // });    

    app.get("/hello", function(req, res) {
       res.send({ hello: 'world' });
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(routes);

    app.use(errorHandler);

    return new Promise(resolve => {
      const server = app.listen(config.get('app.port'), () => {
        resolve(server);
      })
    });
  }
};




