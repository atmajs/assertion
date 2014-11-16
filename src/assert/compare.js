(function() {
	
	var lessThan,
		lessThanOrEqual,
		greaterThan,
		greaterThanOrEqual
		;
	
	lessThan = 
	assert.lessThan =
	function equal(actual, expected, message) {
		if (actual < Number(expected))
			fail(actual, expected, message, '<', lessThan);
	};

	lessThanOrEqual = 
	assert.lessThanOrEqual =
	function equal(actual, expected, message) {
		if (actual <= Number(expected))
			fail(actual, expected, message, '<=', lessThan);
	};

	greaterThan = 
	assert.greaterThan =
	function strictEqual(actual, expected, message) {
		if (actual > Number(expected))
			fail(actual, expected, message, '>', greaterThan);

	};

	greaterThanOrEqual = 
	assert.greaterThanOrEqual =
	function strictEqual(actual, expected, message) {
		if (actual >= Number(expected))
			fail(actual, expected, message, '>=', greaterThanOrEqual);

	};
	
	assert.lt_ = lessThan;
	assert.lte_ = lessThanOrEqual;
	assert.gt_ = greaterThan;
	assert.gte_ = greaterThanOrEqual;

}());