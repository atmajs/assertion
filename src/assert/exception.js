(function() {

	assert.throws = function(mix, /*optional*/ error, /*optional*/ message) {
		return _throws.apply(this, [true].concat(_Array_slice.call(arguments)));
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