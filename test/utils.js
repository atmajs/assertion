var throws,
	doesNotThrow,
	runAssertion,
	checkMany
	;
	
	
	
(function(){
	
	/* Array<Array<fnName, VALUE, checkValueTRUE, checkValueFALSE >> */
	checkMany = function(mix, array) {
		
		var _fnName;
		
		if (typeof mix === 'string') {
			_fnName = mix;
		} else {
			array = mix;
		}
		
		array.forEach(function(test){
			
			var fnName = _fnName || test.shift();
			var fn = A.assert[fnName],
				a = test.shift(),
				b = test.shift(),
				c = test.shift()
				;
			
			
			doesNotThrow([fn, a, b]);
			
			c !== void 0 &&
				throws([fn, a, c]);
		});
	};
	
		
	throws = function(){
		
		eq(runAssertion('throws', arguments), null);
		notEq(runAssertion('doesNotThrow', arguments), null);
	};
	
	doesNotThrow = function(){
		
		eq(runAssertion('doesNotThrow', arguments), null);
		notEq(runAssertion('throws', arguments), null);
	};

	
	runAssertion = function(name, args){
		
		try {
			A.assert[name].apply(null, args);
		} catch(error) {
			return error;
		}
		
		return null;
	}
	
}());
