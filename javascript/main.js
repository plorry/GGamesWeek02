var gamejs = require('gamejs');

var GameScene = require('./gramework/scenes').GameScene;
var Actor = require('./gramework/actors').Actor;
var Director = require('./gramework/game').Director;
var Player = require('./trees').Player;
var config = require('./config');

gamejs.preload(config.RESOURCES);

function main() {
    var director = new Director();
    var firstScene = new GameScene(director, config.scenes.title);

    var physics = firstScene.physics;

    var actor_opts = {
        x: 7.2,
        y: 3,
        height: 1,
        width: 1,
        physics: physics,
        angle: 0
    };
    var ball = new Player(actor_opts);
    actor_opts.x = 12;
    var ball2 = new Player(actor_opts);

    firstScene.addActors([ball, ball2]);
    director.start(firstScene);
    return;
}

gamejs.ready(main);