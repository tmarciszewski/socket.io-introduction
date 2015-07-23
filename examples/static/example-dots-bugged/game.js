'use strict';
var height = window.innerHeight;
var width = window.innerWidth;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { create: create });
var graphics;
var isDrawing = false;

function draw(x, y, color) {
  graphics.lineStyle(0);
  graphics.beginFill(Phaser.Color.hexToRGB(color), 1);
  graphics.drawCircle(x, y, 25);
  graphics.endFill();
}

var socket = io();
socket.on('example-dot-point', function(point) {
  draw(point.x, point.y, point.color);
});

function onTouchDown(pointer, e) {
  isDrawing = true;
  socket.emit('example-dot-point', { x: e.clientX, y: e.clientY });
}

function onDrag(pointer, x, y) {
  if(isDrawing) {
    socket.emit('example-dot-point', { x: x, y: y });
  }
}

function onToucnUp(a, b, c) {
  isDrawing = false;
  console.log('on up', a, b, c);
}

function create() {
  graphics = game.add.graphics(0, 0);
  game.stage.backgroundColor = '#4d4d4d';
  // Maintain aspect ratio
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  // game.input.onDown.add(gofull, this);
  game.input.onDown.add(onTouchDown, game);
  game.input.addMoveCallback(onDrag, game);
  game.input.onUp.add(onToucnUp, game);
}