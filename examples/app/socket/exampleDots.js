module.exports = function(io) {
  
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  io.on('connect', function(socket) {

    var myColor = getRandomColor();

    socket.on('example-dot-point', function(evt) {
      evt.color = myColor;
      io.emit('example-dot-point', evt);
    });
    
  });
};
