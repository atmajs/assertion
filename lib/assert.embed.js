var assert;
(function(global, exports){
	
	(function(){
		// source /src/exports.js
		// source scope-vars
		
		
		var _Array_slice = Array.prototype.slice,
		
			assert = {
				errors: 0
			};
		// end:source scope-vars
			
		// source utils/is
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
		// end:source utils/is
		// source utils/object
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
		
		// end:source utils/object
		// source utils/string
		function str_truncate(str, length) {
		
			if (is_String(str) === false)
				return str;
		
			return str.length < length
				? str
				: str.slice(0, length)
				;
		}
		// end:source utils/string
		// source utils/stack
		var stack_prepair;
		
		(function(){
			
			stack_prepair = function(stack) {
				if (stack == null) 
					return '';
				
				var lines = stack.split('\n'),
					startIndex = 1, endIndex = lines.length
					;
				
				var rgx_start = /(^([ \t]*at )?[\w\.]*assert[_\.])|(^([ \t]*at )?\w+\.assert)/i,
					rgx_end = /(^([ \t]*at )?runCase)/i
					;
				
				var i = 0, 
					imax = lines.length;
				
				while ( ++i < imax ){
					if (rgx_start.test(lines[i])) 
						startIndex = i + 1;
					
					if (rgx_end.test(lines[i])) {
						endIndex = i;
						break;
					}
				}
				
				lines.splice(endIndex);
				lines.splice(1, startIndex - 1);
				
				
				return lines.join('\n');
			};
			
		}());
		// end:source utils/stack
		// source utils/style
		var style_get,
			style_isVisible;
		(function(){
			
			var getters = {};
			
			// source style/box
			(function(){
				// Mainly for the FireFox support
				// as for instance 'padding' returns empty string
				
				obj_extend(getters, {
					'border-width': boxSizeDelegate('border-%anchor-width'),
					'padding': boxSizeDelegate('padding-%anchor'),
					'margin': boxSizeDelegate('margin-%anchor'),
				});
				
				function boxSizeDelegate(pattern) {
					return function(el){
						return boxSize(el, pattern);
					};
				}
				function boxSize(el, pattern) {
					var sizes = [];
					var equal = true;
					var prev  = null;
					(['top', 'right', 'bottom', 'left']).forEach(function(anchor){
						var style = pattern.replace('%anchor', anchor),
							val = getStyle(el, style);
						
						equal = prev == null || prev === val;
						prev  = val;
						
						sizes.push(val);
					});
					if (equal) {
						return sizes[0];
					}
					return sizes.join(' ');
				}
				
			}());
			
			// end:source style/box
			// source style/color
			(function(){
				
				// getComputedStyle returns RGB for colors
				
				obj_extend(getters, {
					'background-color': colorDelegate('background-color'),
					'color': colorDelegate('color'),
				});
				
				function colorDelegate(property) {
					return function(el, expect){
						return color(el, property, expect);
					};
				}
				
				function color(el, property, expect) {
					var current = getStyle(el, property);
					if (isEmpty(current)) {
						return current;
					}
					var x = toBrowsersColor(expect);
					if (x === current) {
						return expect;
					}
					if (isHex(expect) && isRgb(current)) {
						return toHex(current);
					}
					
					return current;
				}
				
				var rgx_RGB = /rgba? *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3})/;
				var div = null;
				
				function isRgb(any) {
					return /^rgb/.test(any);
				}
				function isHex(any) {
					return /^#/.test(any);
				}
				function isEmpty(any) {
					return any == null || any === '';
				}
				
				function toHex(rgb) {
					
					var values = rgx_RGB.exec(rgb);
					if (values == null || values.length !== 4)
						return rgb;
					
					var r = Math.round(parseFloat(values[1]));
					var g = Math.round(parseFloat(values[2]));
					var b = Math.round(parseFloat(values[3]));
					return "#" 
						+ (r + 0x10000).toString(16).substring(3).toUpperCase() 
						+ (g + 0x10000).toString(16).substring(3).toUpperCase()
						+ (b + 0x10000).toString(16).substring(3).toUpperCase();
				}
				function toBrowsersColor (any) {
					if (div == null) {
						div = document.createElement('div');
						document.body.appendChild(div);
					}
					div.style.color = any;
					return getComputedStyle(div).color;
				}
			}());
			// end:source style/color
			
			style_get = function (el, property, expect) {
				var fn = getters[property];
				if (fn) {
					return fn(el, expect);
				}
				return getStyle(el, property);
			};
			
			style_isVisible = function (el) {
				if (el == null) {
					return false;
				}
				var style = getStyle(el, 'display');
				if (style === 'none') {
					return false;
				}
				var style = getStyle(el, 'visibility');
				if (style === 'hidden') {
					return false;
				}
				return true;
			};
			
			function getStyle(el, property) {
				if (global.getComputedStyle == null) {
					return $(el).css(property);
				}
				
				var styles = global.getComputedStyle(el);
				var x = styles.getPropertyValue(property);
				return x === ''
					? el.style.getPropertyValue(property)
					: x;
			}
		}());
		// end:source utils/style
		
		// source error
		var fail;
		
		(function() {
		
			fail = function assert_fail (actual, expected, message, operator, stackStartFunction) {
		
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
			assert.fail = function (mix) {
				var error = mix;
				if (typeof mix === 'string') {
					error = new AssertionError({
						message: mix
					});
				}
				assert.errors++;
		
				throw error;
			};
			assert.prepairStack = stack_prepair;
		
		
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
		
					this.stack = new Error().stack;
				}
		
				this.stack = stack_prepair(this.stack);
			}
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
		// end:source error
		
		// source assert/exception
		(function() {
		
			assert.throws = function(mix, /*optional*/ error, /*optional*/ message) {
				return _throws.apply(this, [true].concat(_Array_slice.call(arguments)));
			};
		
		
			assert.doesNotThrow = function(mix, /*optional*/ message) {
				return _throws.apply(this, [false].concat(_Array_slice.call(arguments)));
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
				
				return actual;
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
		// end:source assert/exception
		// source assert/callback
		(function() {
			
			assert.callbacks = [];
			assert.await = assert_await;
			assert.avoid = assert_avoid;
			
			function assert_await() {
				
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
						stack: stack_prepair((new Error).stack)
					};
				
				cbs.push(obj);
				return function(){
					
					if (--obj.count === 0) 
						cbs.splice(cbs.indexOf(obj), 1);
					
					if (typeof fn !== 'function') 
						return null;
					
					return fn.apply(ctx, arguments);
				}
			}
			
			function assert_avoid() {
				var name = 'function',
					count = 0,
					ctx,
					fn;
					
				
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
				
				var cbs = this.callbacks;
				if (cbs == null)
					cbs = this.callbacks = [];
		
				return function(mix) {
					
					if (--count < 0) {
							
						var obj = {
							count: count,
							name: '<avoid>' + (name || ''),
							argument: mix
						};
						
						cbs.push(obj);
					}
					
		
					fn && fn.apply(ctx, arguments)
				};
			}
		}());
		// end:source assert/callback
		// source assert/equal
		(function() {
		
			assert.ok = function ok(value, message) {
				if (!value)
					fail(value, true, message, '==', ok);
			};
		
		
			var equal,
				notEqual,
				strictEqual,
				notStrictEqual
				;
		
			equal =
			assert.equal =
			function equal(actual, expected, message) {
				/* jshint eqeqeq: false */
				if (actual != expected)
					fail(actual, expected, message, '==', equal);
				/* jshint eqeqeq: true */
			};
		
			notEqual =
			assert.notEqual =
			function notEqual(actual, expected, message) {
				/* jshint eqeqeq: false */
				if (actual == expected)
					fail(actual, expected, message, '!=', notEqual);
				/* jshint eqeqeq: true */
			};
		
			strictEqual =
			assert.strictEqual =
			function strictEqual(actual, expected, message) {
				if (actual !== expected)
					fail(actual, expected, message, '===', strictEqual);
		
			};
		
			notStrictEqual =
			assert.notStrictEqual =
			function notStrictEqual(actual, expected, message) {
				if (actual === expected)
					fail(actual, expected, message, '!==', notStrictEqual);
		
			};
		
			assert.eq_ = equal;
			assert.notEq_ = notEqual;
			assert.strictEq_ = strictEqual;
			assert.notStrictEq_ = notStrictEqual;
		
		}());
		// end:source assert/equal
		// source assert/deepEqual
		(function() {
		
			var deepEqual,
				notDeepEqual
				;
		
			assert.deepEqual =
			deepEqual =
			function deepEqual(actual, expected, message) {
		
				if (_deepEqual(actual, expected) === false)
					fail(actual, expected, message, 'deepEqual', deepEqual);
			};
		
		
			assert.notDeepEqual =
			notDeepEqual =
			function notDeepEqual(actual, expected, message) {
		
				if (_deepEqual(actual, expected) === true)
					fail(actual, expected, message, 'notDeepEqual', notDeepEqual);
			};
		
		
			assert.deepEq_ = deepEqual;
			assert.notDeepEq_ = notDeepEqual;
		
			function _deepEqual(a, b) {
				/* jshint eqeqeq: false */
				if (a == null || b == null)
					return a == b;
		
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
				/* jshint eqeqeq: true */
			}
		
		
			function objEquiv(a, b) {
		
				var ka = obj_keys(a).sort(),
					kb = obj_keys(b).sort(),
					key, i;
		
				if (ka.length !== kb.length)
					return false;
		
				i = ka.length;
				while ( --i !== -1) {
					/* jshint eqeqeq: false */
					if (ka[i] != kb[i])
					/* jshint eqeqeq: true */
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
		// end:source assert/deepEqual
		// source assert/compare
		(function() {
		
			var lessThan,
				lessThanOrEqual,
				greaterThan,
				greaterThanOrEqual
				;
		
			lessThan =
			assert.lessThan =
			function lessThan(actual, expected, message) {
				if (Number(actual) >= Number(expected))
					fail(actual, expected, message, '<', lessThan);
			};
		
			lessThanOrEqual =
			assert.lessThanOrEqual =
			function lessThanOrEqual(actual, expected, message) {
				if (Number(actual) > Number(expected))
					fail(actual, expected, message, '<=', lessThan);
			};
		
			greaterThan =
			assert.greaterThan =
			function greaterThan(actual, expected, message) {
				if (Number(actual) <= Number(expected))
					fail(actual, expected, message, '>', greaterThan);
			};
		
			greaterThanOrEqual =
			assert.greaterThanOrEqual =
			function greaterThanOrEqual(actual, expected, message) {
				if (Number(actual) < Number(expected))
					fail(actual, expected, message, '>=', greaterThanOrEqual);
		
			};
		
			assert.lt_ = lessThan;
			assert.lte_ = lessThanOrEqual;
			assert.gt_ = greaterThan;
			assert.gte_ = greaterThanOrEqual;
		
		}());
		// end:source assert/compare
		// source assert/has
		(function() {
			
			var has,
				hasNot;
		
			has =
			assert.has =
			function has(actual, expected, message) {
				_performHas(actual, expected, true, message, has);
			};
		
			hasNot = 
			assert.hasNot =
			function hasNot(actual, expected, message) {
				_performHas(actual, expected, false, message, hasNot);
			}
			
			assert.has_ = has;
			assert.hasNot_ = hasNot;
		
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
					message = '(' + result + ') ' + (message || '');
				
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
		// end:source assert/has
		// source assert/is
		(function(){
		
			var is,
				isNot
				;
		
		
			is =
			assert.is =
			function is(actual, expected, message) {
				_performCheck(actual, expected, true, message, is);
			};
		
			isNot =
			assert.isNot =
			function isNot(actual, expected, message) {
				_performCheck(actual, expected, false, message, isNot);
			};
		
		
			assert.is_ = is;
			assert.isNot_ = isNot;
		
		
		
			function _performCheck(actual, expected, expectedResult, message, stackStartFunction) {
				var result = _is(actual, expected);
				if (result === expectedResult)
					return;
		
				fail(actual, expected, message, '~~', stackStartFunction);
			}
		
		
			function _is(a, b){
				/* jshint eqeqeq: false */
				if (b == null)
					return a == b;
				/* jshint eqeqeq: true */
		
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
		// end:source assert/is
		// source assert/jquery
		(function(){
			assert.setDOMLibrary = setDOMLibrary;
			assert.$ = {};
			
			var $ = global.$ || global.jQuery || global.Zepto || global.Kimbo;
			if ($ == null) 
				return;
			
			setDOMLibrary($);
			
			function setDOMLibrary($) {
				
				var Proto =  {};
				var METHODS =  [
					'eq_',
					'notEq_',
					
					'deepEq_',
					'notDeepEq_',
					
					'has_',
					'hasNot_',
					
					'is_',
					'isNot_',
					
					'lt_',
					'lte_',
					'gt_',
					'gte_',
				];
				
				METHODS.forEach(function (key) {
					Proto[key] = function assert_jquery(mix){
						var args = _Array_slice.call(arguments),
							method = key,
							message
							;
							
						if (is_Array(mix)) {
							message = args[args.length - 1];
							args = mix;
						}
						
						
						switch(method){
							case 'is_':
							case 'isNot_':
								if (args.length === 1) {
									var x = args[0];
									if ('visible' === x || 'hidden' === x) {
										var visibility = style_isVisible(this[0]);
										if (key === 'isNot_') {
											x = x === 'visible' ? 'hidden' : 'visible';
										}
										if ('visible' === x) {
											eq_(visibility, true, 'Element should be visible');
										}
										if ('hidden' === x) {
											eq_(visibility, false, 'Element should be hidden');
										}
										return;
									}
									args.unshift('is');
									args.push(true);
									method = 'is_' === method ? 'eq_' : 'notEq_';
								}
								break;
							case 'has_':
							case 'hasNot_':
								var selector = args[0];
								if (typeof selector !== 'string') 
									break;
								
								if (this[selector] != null && args.length !== 1) 
									break;
								
								var count = args[1],
									$els = this.find(selector);
								if ($els.length === 0) 
									$els = this.filter(selector);
								if ($els.length === 0) {
									$els = querySelector(this, selector);
								}
								
								if ('has_' === method) {
									
									if (isNaN(count)) {
										assert_do('notEq_', $els.length, 0, message);
										return this;
									}
									
									assert_do('eq_', $els.length, count, message);
								}
								
								if ('hasNot_' === method) {
									
									if (isNaN(count)) {
										assert_do('eq_', $els.length, 0, message);
										return this;
									}
									
									assert_do('notEq_', $els.length, count, message);
								}
								
								return this;
						}
						
						var expected = args.pop(),
							x = args.shift(),
							actual
							;
							
						if (typeof x === 'string') {
							// jquery property
							actual = getActual(this, x, args, expected);
						}
						
						if (typeof x === 'function') {
							// custom function
							actual = x(this);
						}
						
						assert_do(method, actual, expected, message);
						return this;
					};
					
					function getActual($, prop, args, expected) {
						if (prop === 'css' && args.length === 1 && $.length !== 0) {
							var el = $.get(0),
								css = args[0];
							return style_get(el, css, expected);
						}
						
						var val = $[prop];
						if (typeof val === 'function') {
							return val.apply($, args);
						}
						
						return val;
					}
					
					function assert_do(method, actual, expected, message){
						
						assert[method](actual, expected, message);
					}
				});
				
				METHODS.forEach(function (key) {
					assert.$[key] = function(){
						var args = _Array_slice.call(arguments),
							ctx = args.shift();
							
						return Proto[key].apply(ctx, args);
					};
					
					// If defined leave untouched
					if ($.fn[key] !== void 0) 
						return;
					
					$.fn[key] = Proto[key];
				});		
			}
			
			function querySelector($els, selector) {
				var set = $();
				$els.each(function(i, el){
					if (el == null || el.querySelectorAll == null)
						return;
					
					var arr = el.querySelectorAll(selector);
					set = set.add(arr);
				});
				return set;
			}
		}());
		// end:source assert/jquery
		
		// source listeners
		(function(){
			
			// wrap functions
			(function(lib, emit){
				
				for (var key in lib) {
					if (typeof lib[key] !== 'function') 
						continue;
					
					switch(key){
						case 'callback':
						case 'await':
						case 'avoid':
						case 'prepairStack':
						case 'on':
						case 'off':
							continue;
					}
					
					if (key[0] === key[0].toUpperCase()) 
						continue;
					
					lib[key] = wrapFn(lib[key]);
				}
				
				
				function wrapFn(fn) {
					return function assert_wrapFn(){
						
						var result;
						emit('start');
						
						try {
							result = fn.apply(this, arguments);
						} catch(error) {
							
							if (emit('fail', error) === false) 
								throw error;
							
							return null;
						}
						
						emit('success');
						
						return result;
					};
				}
				
			}(assert, emit));
			
			assert.on = function assert_on(type, listener) {
				
				if (_events[type] == null) 
					_events[type] = [];
				
				_events[type].push(listener);
			};
			
			assert.off = function assert_off(type, listener){
				
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
		// end:source listeners
		
		exports.assert = obj_extend(assert.ok, assert);
		// end:source /src/exports.js
	}());
	
	assert = exports.assert;	
}(global, {}));

