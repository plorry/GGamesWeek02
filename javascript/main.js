var gamejs = require('gamejs');

var GameScene = require('./gramework/scenes').GameScene;
var Actor = require('./gramework/actors').Actor;
var Director = require('./gramework/game').Director;
var Player = require('./trees').Player;
var Puck = require('./trees').Puck;
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

    var puck_opts = {
        x: 12,
        y: 10,
        radius: 0.5,
        physics: physics
    };
    var puck = new Puck(puck_opts);

    var p2_opts = {
        x: 7.2,
        y: 20,
        height: 1,
        width: 1,
        physics: physics,
        angle: 0,
        player: 2
    };
    var p2_1 = new Player(p2_opts);
    p2_opts.x = 12;
    var p2_2 = new Player(p2_opts);

    firstScene.addActors([ball, ball2, puck, p2_1, p2_2]);
    director.start(firstScene);
    return;
}

gamejs.ready(main);