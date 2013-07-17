var gamejs = require('gamejs');
var objects = require('gamejs/utils/objects');
var physics = require('./gramework/physics');
var Body = require('./gramework/physics').Body;
var Actor = require('./gramework/actors').Actor;
var config = require('./config');
var SpriteSheet = require('./gramework/animate').SpriteSheet;
var Animation = require('./gramework/animate').Animation;

var defaultMapping = {
    'LEFT': gamejs.event.K_LEFT,
    'RIGHT': gamejs.event.K_RIGHT,
    'UP': gamejs.event.K_UP,
    'DOWN': gamejs.event.K_DOWN,
    'BUTTON1': gamejs.event.K_p,
    'BUTTON2': gamejs.event.K_l
};

var Player = exports.Player = function(options) {
    Player.superConstructor.apply(this, arguments);
    return this;
};
objects.extend(Player, Actor);

Player.prototype.init = function(options) {
    Actor.prototype.init.call(this, options);
    this.physics = options.physics || null;
    
    if (this.physics) {
        this.body = new Body(this.physics, {
            type: options.type || 'dynamic',
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width,
            angle: this.angle,
            density: this.density,
            fixedRotation: options.fixedRotation || false,
            type: 'player'
        });
    }
    return;
};

Player.prototype.handleEvent = function(event) {
    if (event.type === gamejs.event.KEY_DOWN) {
        if (event.key === defaultMapping['RIGHT']) {
            this.body.body.SetAngularVelocity(10);
        }
        if (event.key === defaultMapping['LEFT']) {
            this.body.body.SetAngularVelocity(-10);
        }
        if (event.key === defaultMapping['UP']) {
            this.body.body.ApplyImpulse({x:0, y:-3}, this.body.body.GetWorldCenter())
        }
        if (event.key === defaultMapping['DOWN']) {
            this.body.body.ApplyImpulse({x:0, y:3}, this.body.body.GetWorldCenter())
        }
    } else if (event.type === gamejs.event.KEY_UP) {
        if (event.key === defaultMapping['RIGHT'] || event.key === defaultMapping['LEFT']) {
            this.body.body.SetAngularVelocity(0);
        }
    }
    return;
};

var Puck = exports.Puck = function(options) {
    Puck.superConstructor.apply(this, arguments);
    return this;
};
objects.extend

