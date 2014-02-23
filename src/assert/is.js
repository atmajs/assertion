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