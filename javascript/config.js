var gamejs = require('gamejs');

var WIDTH = exports.WIDTH = 300;
var HEIGHT = exports.HEIGHT = 350;

exports.DEBUG = true;
exports.PHYSICS_DEBUG = true;

var STATIC_PATH = exports.STATIC_PATH = './static/';
//var tree_image = exports.tree_image = STATIC_PATH + 'sprites/wood.png';

exports.RESOURCES = [
];

exports.SCALE = 2;

exports.scenes = {
	'title': {
        'width': WIDTH,
        'height': HEIGHT,
        'scale': 2
	}
};