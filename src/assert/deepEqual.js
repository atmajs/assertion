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