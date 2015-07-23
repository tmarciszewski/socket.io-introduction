module.exports = function(io) {
  var ballNamespace = io.of('/ball');
  var _ = require('lodash');
  var autoKickTimeout;

  var points = {};

  function getClientCount() {
    return ballNamespace.sockets.length;
  }

  function setAutoKick(socket) {
    autoKickTimeout = setTimeout(function() {
      passBall(socket);
    }, 2000);
  }
  function passBall(socket) {

    if(autoKickTimeout) {
      clearTimeout(autoKickTimeout);
    }
    setAutoKick(socket);

    _.each(ballNamespace.sockets, function(s) {
      s.hasBall = false;
    });

    var nextSocket = socket;
    if(getClientCount() === 0) {
      return;
    }
    else if(getClientCount() > 1) {
      var socketsWithoutCurrent = _.without(ballNamespace.sockets, socket);
      nextSocket = _.sample(socketsWithoutCurrent, 1)[0];
    }
    
    nextSocket.hasBall = true;
    nextSocket.emit('ball', getClientCount());
    ballNamespace.emit('who-got-ball', nextSocket.id);
  }


  ballNamespace.on('connection', function(currentSocket){
    console.log('someone connected. Client count:', getClientCount());
    currentSocket.on('reset', function() {
      passBall(currentSocket);
    });

    currentSocket.on('pass-ball', function() {
      
      if(currentSocket.hasBall) {
        if(points[currentSocket.id]) {
          points[currentSocket.id] += 1;
        }
        else {
          points[currentSocket.id] = 1;
        }
        passBall(currentSocket);
      }
    });

    currentSocket.on('disconnect', function() {
      if(currentSocket.hasBall) {
        console.log('socket with ball disconnected - passing ball');
        passBall(currentSocket);
      }
    });

    if(getClientCount() === 1) {
      passBall(currentSocket);
    }
  });

  setInterval(function() {
    ballNamespace.emit('client-count', getClientCount());
    var result = _.map(_.keys(points), function(id) {
      return { id: id, points: points[id] };
    });
    ballNamespace.emit('points', result);
    //punkty
  }, 1000);
};
