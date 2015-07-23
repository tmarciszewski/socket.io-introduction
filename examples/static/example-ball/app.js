var app = angular.module('BallApp', []);

app.controller('GameController', function(SocketService) {
  var game = this;
  var socket = SocketService.get('/ball');

  game.getMyId = socket.getId;
  game.getTransportType = socket.getTransportType;
  game.hasBall = '?';
  game.points = [];

  game.passBall = function() {
    socket.emit('pass-ball');
  };

  socket.on('client-count', function(count) {
    game.clientCount = count;
  });

  socket.on('ball', function() {
    game.myBall = true;
  });

  socket.on('disconnect', function() {
    game.myBall = false;
  });

  socket.on('who-got-ball', function(msg) {
    if(msg === game.getMyId()) {
      game.hasBall = 'It\'s me!';
    }
    else {
      game.hasBall = msg;
      game.myBall = false;
    }
  });

  socket.on('points', function(pts) {
   game.points.length = 0;
   for(var i = 0; i < pts.length; i++) {
    game.points.push(pts[i]);
   }
  });
});

app.factory('SocketService',
  function($rootScope) {
    return {
      get: function(namespace) {
        var socket = io.connect(namespace);

        return {
          getId: function() {
            return socket.id;
          },

          getTransportType: function() {
            return socket.io.engine.transport.name;
          },

          disconnect: function() {
            socket.disconnect();
          },

          on: function(eventName, callback) {
            socket.on(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function() {
                callback.apply(socket, args);
              });
            });
          },

          emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
              var args = arguments;
              $rootScope.$apply(function() {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            });
          }
        };
      }
    };
  }

);
