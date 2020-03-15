const config = require("config");
const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

module.exports = {
  runServer: () => {
    const app = express();

    app.options('/*', (req, res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', '*');
      res.end();
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