var gamejs = require('gamejs');

var WIDTH = exports.WIDTH = 300;
var HEIGHT = exports.HEIGHT = 350;

exports.DEBUG = false;
exports.PHYSICS_DEBUG = false;

var STATIC_PATH = exports.STATIC_PATH = './static/';
var rink_image = exports.rink_image = STATIC_PATH + 'sprites/rink.png';
var player_img = exports.player_img = STATIC_PATH + 'sprites/player.png';
var player2_img = exports.player2_img = STATIC_PATH + 'sprites/player2.png';
var puck_img = exports.puck_img = STATIC_PATH + 'sprites/puck.png';

exports.RESOURCES = [
	rink_image,
	player_img,
	player2_img,
	puck_img
];

exports.SCALE = 2;

exports.scenes = {
	'title': {
        'width': WIDTH,
        'height': HEIGHT,
        'scale': 1,
        'image': rink_image
	}
};