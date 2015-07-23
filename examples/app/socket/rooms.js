module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('joinRoom', function(roomName) {
      console.log('room joined', roomName);
      socket.join(roomName);
    });

    socket.on('leaveRoom', function(roomName) {
      socket.leave(roomName);
    });

    socket.on('userMsg', function(msg) {
      socket.emit('msg', 'server received msg: ' + msg);
    });
  });

  setInterval(function() {
    io.to('room1').emit('msg', 'Message to Room 1 ' + new Date());
    io.to('room2').emit('msg', 'Message to Room 2 ' + new Date());
    io.to('room3').emit('msg', 'WOW. Much Rooms. So multiplexy');
  }, 3000);
};