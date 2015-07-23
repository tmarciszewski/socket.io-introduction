module.exports = function(io) {

  function getRandomImage() {
    return 'http://lorempixel.com/400/200/sports/' + Math.floor(Math.random() * 11);
  }
  
  setInterval(function() {
    var url = getRandomImage();
    io.emit('example-broadcast-image', url);
  }, 2000);

};