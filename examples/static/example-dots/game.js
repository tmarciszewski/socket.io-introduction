'use strict';
var height = window.innerHeight;
var width = window.innerWidth;
// var game = new Phaser.Game(1334, 750, Phaser.AUTO, 'phaser-example', { create: create, update: update, preload: preload });
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { create: create, update: update, preload: preload });
var graphics;
var isDrawing = false;
var toDraw = [];

function preload() {
  game.load.image('dot', '/dot.png');
}

var socket = io();
socket.on('example-dot-point', function(point) {
  toDraw.push(point);
});

function onTouchDown(pointer, e) {
  isDrawing = true;
  socket.emit('example-dot-point', { x: pointer.x || e.clientX, y: pointer.y || e.clientY });
}

function onTouchDrag(pointer, x, y) {
  if(isDrawing) {
    socket.emit('example-dot-point', { x: x, y: y });
  }
}

function onToucnUp() {
  isDrawing = false;
}

function destroySprite(sprite) {
  setTimeout(function() {
    sprite.destroy();
  }, 15000);
}

function update() {
  _.each(toDraw.splice(0, toDraw.length), function(d) {
    var sprite = game.add.sprite(d.x, d.y, 'dot');
    sprite.tint = Phaser.Color.hexToRGB(d.color);
    destroySprite(sprite);
  });
}

function create() {
  graphics = game.add.graphics(0, 0);
  game.stage.backgroundColor = '#4d4d4d';
  // Maintain aspect ratio
  //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  // game.input.onDown.add(gofull, this);
  game.input.onDown.add(onTouchDown, game);
  game.input.addMoveCallback(onTouchDrag, game);
  game.input.onUp.add(onToucnUp, game);
}