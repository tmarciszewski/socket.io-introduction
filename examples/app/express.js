'use strict';

var express = require('express');
var app = express();

app.use(express.static('static'));

require('./routes.js')(app);


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
require('./socket/exampleBroadcast.js')(io);
require('./socket/exampleBidirectional.js')(io);
require('./socket/exampleDots.js')(io);
require('./socket/exampleBall.js')(io);
require('./socket/rooms.js')(io);


