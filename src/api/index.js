const config = require("config");
const path = require('path');
const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const timeout = require('connect-timeout'); //express v4


module.exports = {
  runServer: () => {
    const app = express();

    app.use(timeout('10s')); 

    app.use((req, res, next) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', '*');
      next();
    });

    // app.options('/*', (req, res) => {
    //   res.end();
    // });

    app.get("/hello", function(req, res) {
       res.send({ hello: 'world' });
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, '..', '..', 'build')));

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
    });

    app.get("/callback", function(req, res) {
      res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
    });

    app.use(routes);

    app.use(errorHandler);

    app.use(haltOnTimedout);

    function haltOnTimedout(req, res, next){
      if (!req.timedout) next();
    }

    return new Promise(resolve => {
      const server = app.listen(config.get('app.port'), () => {
        resolve(server);
      })
    });
  }
};




