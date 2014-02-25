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
		if (actual != expected)
			fail(actual, expected, message, '==', equal);
	};

	notEqual = 
	assert.notEqual =
	function notEqual(actual, expected, message) {
		if (actual == expected)
			fail(actual, expected, message, '!=', notEqual);
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