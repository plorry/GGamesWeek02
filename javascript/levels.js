var objects = require('gamejs/utils/objects');
var Body = require('./gramework/physics').Body;
var Scene = require('./gramework/scenes').Scene;
var Puck = require('./trees').Puck;
var config = require('./config');
var gamejs = require('gamejs');
var playsound = require('./gramework/sounds').playsound;

var GameScene = exports.GameScene = function(director, sceneConfig) {
    GameScene.superConstructor.apply(this, arguments);
    return this;
};
objects.extend(GameScene, Scene);

GameScene.prototype.initScene = function(sceneConfig) {
    Scene.prototype.initScene.call(this, sceneConfig);
    this.soundPlaying = false;

    new Body(this.physics, { type: "static", x: 0, y:35, height: 0.5, width: 13 });
    new Body(this.physics, { type: "static", x: 30, y:35, height: 0.5, width: 13 });
    new Body(this.physics, { type: "static", x: 30, y:25, height: 50, width: 0.5 });
    new Body(this.physics, { type: "static", x: 0, y:25, height: 50, width: 0.5 });
    new Body(this.physics, { type: "static", x: 0, y:0, height: 0.5, width: 13 });
    new Body(this.physics, { type: "static", x: 30, y:0, height: 0.5, width: 13 });
    
    this.puck_opts = {
        x: 15,
        y: 18,
        height: 0.5,
        width: 0.5,
        radius: 0.5,
        physics: this.physics,
        spriteSheet: [config.puck_img, {width:10, height:10}],
        animations: {'static':[0]}
    };
    this.puck = new Puck(this.puck_opts);
    this.addProps([this.puck]);

    this.font = new gamejs.font.Font('20px Ebit');
    this.p1Score = 0;
    this.p2Score = 0;

    this.victory_opts = config.scenes.winner;

    return;
};

GameScene.prototype.newPuck = function() {
    this.puck = new Puck(this.puck_opts);
    this.addProps([this.puck]);
    return;
};

GameScene.prototype.update = function(msDuration) {
    Scene.prototype.update.call(this, msDuration);

    if (this.puck.body.body.GetPosition()['y'] < 0) {
        this.puck.kill();
        playsound(config.goal_snd);
        this.p2Score++;
        this.newPuck();
    } else if (this.puck.body.body.GetPosition()['y'] > 35) {
        this.puck.kill();
        this.p1Score++;
        playsound(config.goal_snd);
        this.newPuck();
    }

    if (this.p1Score > 4) {
        this.victory_opts['text'] = "Player 1 Wins The Hockey!";
        var next = new WinScene(this.director, this.victory_opts);
        this.director.start(next);
    } else if (this.p2Score > 4) {
        this.victory_opts['text'] = "Player 2 Wins The Hockey!";
        var next = new WinScene(this.director, this.victory_opts);
        this.director.start(next);
    }

    if (this.soundPlaying == false) {
        playsound(config.music, true);
        this.soundPlaying = true;
    }

    return;
};

GameScene.prototype.draw = function(display) {
    Scene.prototype.draw.call(this, display);

    gamejs.draw.rect(display, "#000", new gamejs.Rect(0, 0, 260, 10));
    gamejs.draw.rect(display, "#000", new gamejs.Rect(340, 0, 260, 10));
    gamejs.draw.rect(display, "#000", new gamejs.Rect(0, 690, 260, 10));
    gamejs.draw.rect(display, "#000", new gamejs.Rect(340, 690, 260, 10));

    this.player1Score = this.font.render('P1: ' + this.p1Score, "#000");
    this.player2Score = this.font.render('P2: ' + this.p2Score, "#000");
    display.blit(this.player1Score);
    display.blit(this.player2Score, [480,0]);

    return;
};

var WinScene = exports.WinScene = function(director, sceneConfig) {
    WinScene.superConstructor.apply(this, arguments);
    return this;
};
objects.extend(WinScene, Scene);

WinScene.prototype.initScene = function(sceneConfig) {
    Scene.prototype.initScene.call(this, sceneConfig);
    this.text = sceneConfig.text;
    this.font = new gamejs.font.Font('20px Ebit');
    this.victory_text = this.font.render(this.text, '#000');
    console.log('initialized');
    return;
};

WinScene.prototype.draw = function(display) {
    Scene.prototype.draw.call(this, display);
    display.blit(this.victory_text, [50,250]);
    return;
}

var TitleScreen = exports.TitleScreen = function(director, sceneConfig) {
    TitleScreen.superConstructor.apply(this, arguments);
    return this;
};
objects.extend(TitleScreen, Scene);

TitleScreen.prototype.handleEvent = function(event) {
    if (event.type === gamejs.event.KEY_DOWN) {
        this.director.startNext();
    }
    return;
};
