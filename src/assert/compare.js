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