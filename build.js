/**
 *	Build: Run Atma.js Toolkit
 *  ``` > npm install atma ```
 *	``` > atma```
 **/

module.exports = {
	'settings': {
		io: {
			extensions: {
				js: ['condcomments:read', 'importer:read']
			}
		}
	},
	'import': {
		files: 'builds/**',
		output: 'lib/',
		defines: {
			DEBUG: true
		}
	},
	'jshint': {
		files: ['lib/assert.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: 'lib/assert.js',
		defines: {
			DEBUG: false
		}
	},

	'watch': {
		files: 'src/**',
		config: '#[import]'
	},

	'defaults': ['import', 'jshint', 'uglify']
};



function JSHint() {
	var options = {
		"bitwise": false,
		"camelcase": false,
		"curly": false,
		"eqeqeq": true,
		"es3": false,
		"forin": false,
		"freeze": false,
		"immed": true,
		"indent": 2,
		"latedef": "nofunc",
		"newcap": false,
		"noarg": true,
		"noempty": true,
		"nonbsp": true,
		"nonew": false,
		"plusplus": false,
		"quotmark": false,
		"undef": true,
		"unused": false,
		"strict": false,
		"trailing": false,
		"maxparams": false,
		"maxdepth": false,
		"maxstatements": false,
		"maxcomplexity": false,
		"maxlen": false,
		"asi": true,
		"boss": false,
		"debug": true,
		"eqnull": true,
		"esnext": true,
		"evil": true,
		"expr": true,
		"funcscope": false,
		"gcl": false,
		"globalstrict": true,
		"iterator": false,
		"lastsemic": true,
		"laxbreak": true,
		"laxcomma": true,
		"loopfunc": false,
		"maxerr": false,
		"moz": false,
		"multistr": true,
		"notypeof": false,
		"proto": true,
		"scripturl": false,
		"smarttabs": true,
		"shadow": true,
		"sub": true,
		"supernew": true,
		"validthis": true,
		"noyield": false,
		"browser": true,
		"couch": false,
		"devel": false,
		"dojo": false,
		"jquery": true,
		"mootools": false,
		"node": true,
		"nonstandard": false,
		"phantom": false,
		"prototypejs": false,
		"rhino": false,
		"worker": false,
		"wsh": false,
		"yui": false,
		"nomen": false,
		"onevar": false,
		"passfail": false,
		"white": false,
		"predef": [
			"global",
			"include",
			"define",
			"atma",
			"eq_",
			"notEq_",
			"deepEq_",
			"notDeepEq_",
			"has_",
			"hasNot_"
		]
	};
	return {
		options: options,
		globals: options.predef
	};
}