module.exports = function(io) {

  function getRandomImage() {
    return 'http://lorempixel.com/400/200/sports/' + Math.floor(Math.random() * 11);
  }

  io.on('connect', function(socket) {

    socket.on('get-image', function() {
      socket.emit('image', getRandomImage());
    });
    
  });
};
