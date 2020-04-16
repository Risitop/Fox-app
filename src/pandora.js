let game_engine;

function game_setup() {
  game_engine = new GameEngine();
  game_engine.loadLevel('levels/jail.json');
}

window.onload = function() {
  game_setup();
}
