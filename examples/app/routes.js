module.exports = function(app) {
  'use strict';
  app.get('/', function (req, res) {
    res.send('Hello World!!!');
  });
};
