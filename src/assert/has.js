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