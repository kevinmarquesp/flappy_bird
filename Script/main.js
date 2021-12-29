function loop() {
  background.draw();
  floor.draw();
  flappy_bird.draw();

  requestAnimationFrame(loop);
}

loop();

