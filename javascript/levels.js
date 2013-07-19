var objects = require('gamejs/utils/objects');
var Body = require('./gramework/physics').Body;
var Scene = require('./gramework/scenes').Scene;
var Puck = require('./trees').Puck;
var config = require('./config');
var gamejs = require('gamejs');

var GameScene = exports.GameScene = function(director, sceneConfig) {
	GameScene.superConstructor.apply(this, arguments);
	return this;
};
objects.extend(GameScene, Scene);

GameScene.prototype.initScene = function(sceneConfig) {
	Scene.prototype.initScene.call(this, sceneConfig);

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
		this.newPuck();
	} else if (this.puck.body.body.GetPosition()['y'] > 35) {
		this.puck.kill();
		this.newPuck();
	}

	return;
};

GameScene.prototype.draw = function(display) {
	Scene.prototype.draw.call(this, display);

	gamejs.draw.rect(display, "#000", new gamejs.Rect(0, 0, 260, 20));
	gamejs.draw.rect(display, "#000", new gamejs.Rect(340, 0, 260, 20));
	gamejs.draw.rect(display, "#000", new gamejs.Rect(0, 680, 260, 20));
	gamejs.draw.rect(display, "#000", new gamejs.Rect(340, 680, 260, 20));

	return;
};
