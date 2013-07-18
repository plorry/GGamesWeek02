var gamejs = require('gamejs');
var Camera = require('./camera').Camera;

var Physics  = require('./physics').Physics;
var Body = require('./physics').Body;
var Joint = require('./physics').Joint;

var objects = require('gamejs/utils/objects');

var Actor = require('./actors').Actor;

//Scene Class

var Scene = exports.Scene = function(director, sceneConfig) {
	this.director = director;
	this.display = this.director.display;

	this.camera = new Camera(this, true);
	this._frozen = false;
	this.scroll = true;

	this.actors = new gamejs.sprite.Group();
	this.props = new gamejs.sprite.Group();

	var sceneId = sceneId || 0;
	this.elapsed = 0;
	this.initScene(sceneConfig);
	
	return this;
};

Scene.prototype.initScene = function(sceneConfig) {
	this.width = sceneConfig.width || 1024;
	this.height = sceneConfig.height || 500;
	this.scale = sceneConfig.scale || 1;
	this.physics = new Physics(document.getElementById("gjs-canvas"));
	this.physics.debug();

	this.triggers = [];
	
    this.view = new gamejs.Surface([this.height, this.width]);		
	return;
};

Scene.prototype.addActors = function(actors) {
	this.actors.add(actors);
	return;
};

Scene.prototype.addProps = function(props) {
	this.props.add(props);
	return;
};

Scene.prototype.isFrozen = function() {
	return this._frozen;
};

Scene.prototype.freeze = function() {
	this._frozen = true;
	return;
};

Scene.prototype.unFreeze = function() {
	this._frozen = false;
	return;
};

Scene.prototype.draw = function(display) {
	this.view.fill("#F0A30F");
	this.props.draw(this.view);
	this.actors.draw(this.view);

	var screen = this.camera.draw();
	
	//var size = screen.getSize();
		
	//display.blit(screen);
	
	return;
};

Scene.prototype.handleEvent = function(event) {
	
	this.actors.forEach(function(actor) {
		actor.handleEvent(event);
	});

	if (event.type === gamejs.event.KEY_DOWN) {
		if (event.key === gamejs.event.K_SPACE) {
			this.camera.zoomTo(2);
		}
	}
	if (event.type === gamejs.event.KEY_UP) {
		if (event.key === gamejs.event.K_SPACE) {
			this.camera.zoomTo(1);
		}
	}
	return;
};

var order = function(a,b) {
	return a.rect.top-b.rect.top;
};

Scene.prototype.update = function(msDuration) {	
	if (!this.isFrozen()){
		//step the physics
		this.physics.step(msDuration / 1000);
		//update actors	
		this.actors.forEach(function(actor){
			actor.update(msDuration);
		});
		//update props
		this.props.forEach(function(prop){
			prop.update(msDuration);
		});
	}
	this.camera.update(msDuration);
	this.elapsed += msDuration;

	return;
};

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

	return;
};

var Trigger = exports.Trigger = function(options) {
	this._active = false;
	this.condition = options.condition;
	this.update = options.update || function() {return;};
	this.killCondition = options.killCondition || function() {return false;};
	this.killEvent = options.killEvent || function() {return;};
	return this;
};

Trigger.prototype.activate = function() {
	this._active = true;
	return;
};

Trigger.prototype.isActive = function() {
	return this._active;
};

Trigger.prototype.deactivate = function() {
	this._active = false;
	return;
};