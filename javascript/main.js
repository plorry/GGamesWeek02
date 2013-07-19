var gamejs = require('gamejs');

var GameScene = require('./levels').GameScene;
var TitleScreen = require('./levels').TitleScreen;
var Actor = require('./gramework/actors').Actor;
var Director = require('./gramework/game').Director;
var Player = require('./trees').Player;
var Puck = require('./trees').Puck;
var config = require('./config');
var playsound = require('./gramework/sounds').playsound;

gamejs.preload(config.RESOURCES);

function main() {
    var director = new Director();
    var firstScene = new GameScene(director, config.scenes.title);
    var title = new TitleScreen(director, config.scenes.opening);

    var physics = firstScene.physics;

    var actor_opts = {
        x: 7.2,
        y: 3,
        phys_width: 1,
        phys_height: 1,
        height: 1,
        width: 3,
        physics: physics,
        angle: 0,
        spriteSheet: [
            config.player_img,
            {width: 40, height: 10}
        ],
        animations: {'static':[0]}
    };
    var ball = new Player(actor_opts);
    actor_opts.x = 12;
    var ball2 = new Player(actor_opts);

    var p2_opts = {
        x: 7.2,
        y: 30,
        phys_width: 1,
        phys_height: 1,
        height: 1,
        width: 3,
        physics: physics,
        angle: 0,
        player: 2,
        spriteSheet: [
            config.player2_img,
            {width: 40, height: 10}
        ],
        animations: {'static':[0]}
    };
    var p2_1 = new Player(p2_opts);
    p2_opts.x = 12;
    var p2_2 = new Player(p2_opts);

    firstScene.addActors([ball, ball2, p2_1, p2_2]);
    director.start(title);
    director.setNext(firstScene);
    return;
}

gamejs.ready(main);