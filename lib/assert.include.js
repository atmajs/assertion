// source /src/license.txt
/*!
 * utest-assert v0.99.99
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, 2014
 */
// end:source /src/license.txt
(function(root, factory){
	
	var _exports = {},
		_global = typeof window !== 'undefined'
		? window
		: global
		;
	
	factory(_global, _exports);
	
	include.exports = _exports;
	
}(this, function(global, exports){

	// source /src/exports.js
	// source /src/scope-vars.js
	
	
	var _Array_slice = Array.prototype.slice,
	
		assert = {};
	// end:source /src/scope-vars.js
		
	// source /src/utils/is.js
	function is_Array(ar) {
		return Array.isArray(ar);
	}
	
	function is_Boolean(arg) {
		return typeof arg === 'boolean';
	}
	
	function is_Null(arg) {
		return arg === null;
	}
	
	function is_NullOrUndefined(arg) {
		return arg == null;
	}
	
	function is_Number(arg) {
		return typeof arg === 'number';
	}
	
	function is_String(arg) {
		return typeof arg === 'string';
	}
	
	function is_Symbol(arg) {
		return typeof arg === 'symbol';
	}
	
	function is_Undefined(arg) {
		return arg === void 0;
	}
	
	function is_RegExp(re) {
		return obj_typeof(re) === 'RegExp';
	}
	
	function is_Object(arg) {
		return typeof arg === 'object' && arg !== null;
	}
	
	function is_Date(d) {
		return obj_typeof(d) === 'Date';
	}
	
	function is_Error(e) {
		return obj_typeof(e) === 'Error' || e instanceof Error;
	}
	
	function is_Function(arg) {
		return typeof arg === 'function';
	}
	
	function is_Buffer(buff){
		if (typeof Buffer === 'undefined') 
			return false;
		
		return buff instanceof Buffer;
	}
	
	function is_Arguments(x){
		return obj_typeof(x) === 'Arguments';
	}
	
	function is_Primitive(arg) {
		return arg === null
			|| typeof arg === 'boolean'
			|| typeof arg === 'number'
			|| typeof arg === 'string'
			|| typeof arg === 'symbol'
			|| typeof arg === 'undefined'
			;
	}
	// end:source /src/utils/is.js
	// source /src/utils/object.js
	var obj_typeof,
		obj_inherit,
		obj_extend,
		obj_keys
		;
		
	
	(function(){
	
		
		obj_typeof = function(x) {
			return Object
				.prototype
				.toString
				.call(x)
				.replace('[object ', '')
				.replace(']', '');
		};
		
		obj_inherit = function(Ctor, base) {
			
			function temp(){}
			temp.prototype = base.prototype;
			
			Ctor.prototype = new temp;
		};
	
		obj_keys = Object.keys
			? Object.keys
			: getKeys;
		
		obj_extend = function(target, source){
			if (target == null) 
				target = {};
				
			if (source == null) 
				return target;
			
			for(var key in source){
				target[key] = source[key];
			}
			
			return target;
		};
		
		// private
		
		function getKeys(obj) {
			var keys = [];
			for(var key in keys)
				keys.push(key);
			
			return keys;
		}
		
	}());
	
	// end:source /src/utils/object.js
	// source /src/utils/string.js
	function str_truncate(str, length) {
		
		if (is_String(str) == false) 
			return str;
		
		return str.length < length
			? str
			: str.slice(0, length)
			;
	}
	// end:source /src/utils/string.js
	
	// source /src/error.js
	var fail;
	
	(function() {
	
		fail = function(actual, expected, message, operator, stackStartFunction) {
			
			var error = new AssertionError({
				message: message,
				actual: actual,
				expected: expected,
				operator: operator,
				stackStartFunction: stackStartFunction
			});
			
			throw error;
		};
	
		assert.AssertionError = AssertionError;
		assert.fail = fail;
		
		
		// private
	
		// {message, actual, expected }
		function AssertionError(options) {
			this.name = 'AssertionError';
			this.actual = options.actual;
			this.expected = options.expected;
			this.operator = options.operator;
	
			if (options.message) {
				this.message = options.message;
				this.generatedMessage = false;
			} else {
				this.message = getMessage(this);
				this.generatedMessage = true;
			}
			var stackStartFunction = options.stackStartFunction || fail;
	
			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, stackStartFunction);
			} else {
				// try to throw an error now, and from the stack property
				// work out the line that called in to assert.js.
				try {
					this.stack = (new Error).stack.toString();
				} catch (e) {}
			}
		};
		obj_inherit(AssertionError, Error);
	
		function getMessage(error) {
			var str_actual = JSON.stringify(error.actual, replacer),
				str_expected = JSON.stringify(error.expected, replacer);
	
			return str_truncate(str_actual, 128) + ' ' + error.operator + ' ' + str_truncate(str_expected, 128);
		}
	
	
		function replacer(key, value) {
			if (is_Undefined(value))
				return '' + value;
	
			if (is_Number(value) && (isNaN(value) || !isFinite(value)))
				return value.toString();
	
			if (is_Function(value) || is_RegExp(value))
				return value.toString();
	
			return value;
		}
	
	}());
	// end:source /src/error.js
	
	// source /src/assert/exception.js
	(function() {
	
		assert.throws = function(mix, /*optional*/ error, /*optional*/ message) {
			_throws.apply(this, [true].concat(_Array_slice.call(arguments)));
		};
	
	
		assert.doesNotThrow = function(mix, /*optional*/ message) {
			_throws.apply(this, [false].concat(_Array_slice.call(arguments)));
		};
	
		assert.ifError = function(err) {
			if (err) 
				throw err;
		};
	
		// private
		function _throws(shouldThrow, mix, expected, message) {
			var actual,
				fn, args;
			
			if (is_Array(mix)) {
				var arr = _Array_slice.call(mix);
				fn = arr.shift();
				args = arr;
			}
			
			if (is_Function(mix)) {
				fn = mix;
				args = [];
			}
			
	
			if (is_String(expected)) {
				message = expected;
				expected = null;
			}
	
			try {
				fn.apply(null, args);
			} catch (error) {
				actual = error;
			}
			
			message = ''
				+ (expected && expected.name && (' (' + expected.name + ').') || '.')
				+ ((message && (' ' + message)) || '.') 
	
			
			if (shouldThrow === true && actual == null) 
				fail(actual, expected, 'Missing expected exception' + message);
			
			if (shouldThrow === false && expectedException(actual, expected)) 
				fail(actual, expected, 'Got unwanted exception' + message);
			
	
			if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) 
				throw actual;
			
		}
		
		function expectedException(actual, expected) {
			
			if (!actual || !expected) 
				return false;
			
			if (is_RegExp(expected)) 
				return expected.test(actual);
			
			if (actual instanceof expected) 
				return true;
	
			if (expected.call({}, actual) === true) 
				return true;
			
			return false;
		}
	
	}());
	// end:source /src/assert/exception.js
	// source /src/assert/callback.js
	(function() {
		
		assert.callbacks = [];
		assert.await = function() {
			
			var fn, name, ctx, count;
			
			var i = arguments.length,
				x;
			while( --i > -1) {
				x = arguments[i];
				switch(typeof x) {
					case 'function':
						fn = x;
						break;
					case 'object':
						ctx = x;
						break;
					case 'number':
						count = x;
						break;
					case 'string':
						name = x;
						break;
				}
			}
			
			if (this.callbacks == null) 
				this.callbacks = [];
			
			if (isNaN(count) || count < 1) 
				count = 1;
			
			var cbs = this.callbacks,
				obj = {
					count: count,
					name: name,
					error: new Error
				};
				
			cbs.push(obj);
			
			return function(){
				
				if (--obj.count === 0) 
					cbs.splice(cbs.indexOf(obj), 1);
				
				if (typeof fn !== 'function') 
					return null;
				
				return fn.apply(ctx, arguments);
			}
		};
		
	}());
	// end:source /src/assert/callback.js
	// source /src/assert/equal.js
	(function() {
	
		assert.ok = function ok(value, message) {
			if (!value)
				fail(value, true, message, '==', assert.ok);
		};
	
	
		assert.equal = function equal(actual, expected, message) {
			if (actual != expected)
				fail(actual, expected, message, '==', assert.equal);
		};
	
		assert.notEqual = function notEqual(actual, expected, message) {
			if (actual == expected)
				fail(actual, expected, message, '!=', assert.notEqual);
		};
	
	
		assert.strictEqual = function strictEqual(actual, expected, message) {
			if (actual !== expected)
				fail(actual, expected, message, '===', assert.strictEqual);
	
		};
	
		assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
			if (actual === expected)
				fail(actual, expected, message, '!==', assert.notStrictEqual);
	
		};
		
		assert.eq = assert.equal;
		assert.notEq = assert.notEqual;
		assert.strictEq = assert.strictEqual;
		assert.notStrictEq = assert.notStrictEqual;
	
	}());
	// end:source /src/assert/equal.js
	// source /src/assert/deepEqual.js
	(function() {
	
	
		assert.deepEqual = function deepEqual(actual, expected, message) {
			
			if (_deepEqual(actual, expected) === false) 
				fail(actual, expected, message, 'deepEqual', assert.deepEqual);
		};
	
		
		assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
			
			if (_deepEqual(actual, expected) === true) 
				fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
		};
		
		assert.deepEq = assert.deepEqual;
		assert.notDeepEq = assert.notDeepEqual;
		
		function _deepEqual(a, b) {
			
			if (a === b) 
				return true;
			
			if (is_Arguments(a)) 
				a = _Array_slice.call(a);
			
			if (is_Arguments(a)) 
				a = _Array_slice.call(a);
				
			
			var AType = obj_typeof(a);
			
			switch(AType){
				case 'Number':
				case 'Boolean':
				case 'String':
					return a == b;
				
				case 'RegExp':
				case 'Date':
					return (a).toString() === (b).toString();
			}
			
			if (is_Buffer(a) && is_Buffer(b)) {
				if (a.length != b.length)
					return false;
			 
				for (var i = 0; i < a.length; i++) {
				  if (a[i] != b[i])
					return false;
				}
			 
				return true;
			}
			
			if (!is_Object(a) && !is_Object(b)) 
				return a === b;
			
			return objEquiv(a, b);
		}
	
	
		function objEquiv(a, b) {
			
			var ka = obj_keys(a).sort(),
				kb = obj_keys(b).sort(),
				key, i;
		
			if (ka.length != kb.length)
				return false;
			
			i = ka.length;
			while ( --i !== -1) {
				if (ka[i] != kb[i])
					return false;
			}
			
			i = ka.length
			while (--i !== -1) {
				key = ka[i];
				
				if (!_deepEqual(a[key], b[key]))
					return false;
			}
			
			return true;
		}
	
	
	}());
	// end:source /src/assert/deepEqual.js
	// source /src/assert/has.js
	(function() {
	
	
		assert.has = function has(actual, expected, message) {
			_performHas(actual, expected, true, message, assert.has);
		};
	
		assert.hasNot = function hasNot(actual, expected, message) {
			_performHas(actual, expected, false, message, assert.hasNot);
		}
	
		// = private
		var OPERATOR = '\u2287';
	
		var t_Date = 'Date',
			t_Array = 'Array',
			t_Object = 'Object',
			t_String = 'String',
			t_RegExp = 'RegExp',
			t_Number = 'Number',
			t_Boolean = 'Boolean',
			t_Function = 'Function',
			t_NullOrUndefined = '<undefined>',
			t_Reference = '<reference-check>';
	
		function obj_typeof(x) {
			var type = Object
				.prototype
				.toString
				.call(x)
				.replace('[object ', '')
				.replace(']', '');
	
			switch (type) {
				case t_Date:
				case t_Array:
				case t_String:
				case t_RegExp:
				case t_Boolean:
				case t_Number:
				case t_Function:
					return type;
				case t_Object:
					if (typeof x.length === 'number'
						&& typeof x.splice === 'function'
						&& typeof x.indexOf === 'function') {
						// Array-Alike
						return t_Array;
					}
					
					return t_Object;
				case 'Null':
				case 'Undefined':
					return t_NullOrUndefined;
	
				default:
					// Not supported type.
					// Not possible to run `contains` check
					// -> perform simple `==` comparison
					return t_Reference;
			}
		}
	
		function _performHas(actual, expected, expectedResult, message, stackStartFunction) {
	
			var result = _has(actual, expected);
			if (result === expectedResult) 
				return;
			
	
			if (expectedResult === false && result !== true) {
				// structur missmatch
				return;
			}
	
			if (typeof result === 'string') 
				message = '(' + result + ') ' + message;
			
			fail(actual, expected, message, OPERATOR, stackStartFunction);
		}
	
		function _has(a, b) {
	
			var AType = obj_typeof(a),
				BType = obj_typeof(b);
	
			var _AType, _BType;
	
			switch (AType) {
				case t_String:
					if (t_String === BType) 
						return a.indexOf(b) !== -1
							|| ('Not a substring of ' + a);
					
					if (t_RegExp === BType) 
						return b.test(a) || ('RegExp failed: ' + a);
					
	
					return 'Unexpected types: String-' + BType;
	
				case t_RegExp:
				case t_Date:
				case t_Number:
				case t_Boolean:
				case t_Function:
					return (a).toString() === (b).toString()
						|| ('Unexpected value: ' + a);
	
				case t_Reference:
					return a === b
						|| ('Reference check');
	
				case t_Object:
					if (t_String === BType) 
						return b in a
							|| ('Property expected:' + b);
					
					if (t_Object === BType) {
						for (var key in b) {
							if (key in a === false) 
								return 'Property expected: ' + key;
							
	
							_AType = obj_typeof(a[key]);
							_BType = obj_typeof(b[key]);
	
							if (_BType === t_NullOrUndefined) {
								// property existance
								continue;
							}
							if (_AType !== _BType) 
								return 'Type missmatch: ' + _AType + '-' + _BType;
							
							if (t_String === _AType) {
								if (a[key] !== b[key]) 
									return 'Unexpected value: ' + a[key];
								
								continue;
							}
	
							var result = _has(a[key], b[key]);
							if (result !== true) 
								return result;
						}
						return true;
					}
	
					return 'Unexpected types: Object-' + BType;
			}
	
			if (t_Array === AType) {
	
				switch (BType) {
					case t_Number:
					case t_String:
					case t_Boolean:
						return a.indexOf(b) !== -1
							|| ('Array should contain: ' + b);
	
					case t_Date:
					case t_RegExp:
					case t_Function:
						var val = (b).toString();
						return a.some(function(x) {
							return (x).toString() === val;
						}) || ('Array should contain: ' + val);
	
					case t_Array:
						var ib = 0,
							ibmax = b.length,
							ia,
							iamax = a.length;
						bloop: for (; ib < ibmax; ib++) {
	
							_BType = obj_typeof(b[ib]);
	
							switch (_BType) {
								case t_String:
								case t_Number:
								case t_Boolean:
								case t_RegExp:
								case t_Date:
								case t_Function:
									var result = _has(a, b[ib])
									if (result !== true) 
										return result;
									
									continue bloop;
	
								case t_Object:
								case t_Array:
									ia = 0;
									for (; ia < iamax; ia++) {
	
										if (_BType !== obj_typeof(a[ia])) 
											continue;
										
										if (_has(a[ia], b[ib]) === true) 
											break;
										
									}
	
									if (ia === iamax) 
										return _BType + ' is not a subset';
									
									continue bloop;
							}
						}
						return true;
				}
			}
	
			return 'Unexpected types: ' + AType + '-' + BType;
		}
	
	}());
	// end:source /src/assert/has.js
	// source /src/assert/is.js
	(function(){
		
		
		assert.is = function is(actual, expected, message) {
			_performCheck(actual, expected, true, message, assert.has);
		};
	
		assert.isNot = function isNot(actual, expected, message) {
			_performCheck(actual, expected, false, message, assert.hasNot);
		}
	
		
		function _performCheck(actual, expected, expectedResult, message, stackStartFunction) {
			var result = _is(actual, expected);
			if (result === expectedResult) 
				return;
			
			fail(actual, expected, message, '~~', stackStartFunction);
		}
		
		
		function _is(a, b){
			
			if (b == null) 
				return a == b;
			
			if (typeof b === 'string') {
				var AType = obj_typeof(a);
				
				switch(b) {
					case 'Object':
						return a != null && typeof a === 'object';
				}
				
				
				return  AType === b;
			}
			
			if (typeof b === 'function') 
				return a instanceof b;
			
			if (typeof b === 'object' && b.constructor) 
				return _is(a, b.constructor)
			
			return false;
		}
		
	}());
	// end:source /src/assert/is.js
	// source /src/assert/jquery.js
	(function(){
		assert.setDOMLibrary = setDOMLibrary;
		
		var $ = global.$ || global.jQuery || global.Zepto || global.Kimbo;
		if ($ == null) 
			return;
		
		setDOMLibrary($);
		
		function setDOMLibrary($) {
			
			[
				'$eq',
				'$notEq',
				
				'$deepEq',
				'$notDeepEq',
				
				'$has',
				'$hasNot',
				
				'$is',
				'$isNot'
			]
			.forEach(function(key){
				
				$.fn[key] = function(mix){
					var args = _Array_slice.call(arguments),
						message
						;
						
					if (is_Array(mix)) {
						message = args[args.length - 1];
						args = mix;
					}
					
					var expected = args.pop(),
						fn = args.shift()
						;
					
					
					if (typeof fn === 'string') {
						
						byProperty(key.substring(1), this, fn, args, expected, message);
						return this;
					}
					
					if (typeof fn === 'function') {
						
						byFunction(key.substring(1), this, fn, expected, message);
						return this;
					}
					
					return this;
				};
				
				
				function byProperty(key, $, prop, args, expected, message) {
					var val = $[prop];
					
					if (typeof val === 'function') 
						val = val.apply($, args);
					
					assert[key](val, expected, message);
				}
				
				function byFunction(key, $, fn, expected, message) {
					var val = fn($);
					
					assert[key](val, expected, message);
				}
				
			});
			
		}
		
		
	}());
	// end:source /src/assert/jquery.js
	
	// source /src/listeners.js
	(function(){
		
		// wrap functions
		(function(lib, emit){
			
			for (var key in lib) {
				if (typeof lib[key] !== 'function') 
					continue;
				
				switch(key){
					case 'callback':
					case 'await':
						continue;
				}
				
				if (key[0] === key[0].toUpperCase()) 
					continue;
				
				lib[key] = wrapFn(lib[key]);
			}
			
			
			function wrapFn(fn) {
				return function(){
					
					emit('start');
					
					try {
						fn.apply(this, arguments);
					} catch(error) {
						
						if (emit('fail', error) === false) 
							throw error;
						
						return;
					}
					
					emit('success');
				};
			}
			
		}(assert, emit));
		
		assert.on = function(type, listener) {
			
			if (_events[type] == null) 
				_events[type] = [];
			
			_events[type].push(listener);
		};
		
		assert.off = function(type, listener){
			
			var cbs = _events[type];
			if (cbs == null) 
				return;
			
			
			if (listener == null) {
				cbs.length = 0;
				return;
			}
			
			var i = cbs.length;
			while ( --i !== -1 ) {
				if (cbs[i] === listener)
					cbs.splice(i, 1);
			}
		};
		
		
		// = private
		
		
		var _events = {};
		
		function emit(type) {
				
			var cbs = _events[type];
			if (cbs == null) 
				return false;
			
			var i = cbs.length;
			if (i === 0) 
				return false;
			
			var args = _Array_slice.call(arguments, 1),
				fn;
				
			while ( --i !== -1 ) {
				
				fn = cbs[i];
				fn.apply(null, args);
			}
			
			return true;
		}
			
		
	}());
	// end:source /src/listeners.js
	
	exports.assert = obj_extend(assert.ok, assert);
	// end:source /src/exports.js
	
}));