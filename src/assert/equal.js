(function() {

	assert.ok = function ok(value, message) {
		if (!value)
			fail(value, true, message, '==', ok);
	};


	assert.equal = function equal(actual, expected, message) {
		if (actual != expected)
			fail(actual, expected, message, '==', equal);
	};

	assert.notEqual = function notEqual(actual, expected, message) {
		if (actual == expected)
			fail(actual, expected, message, '!=', notEqual);
	};


	assert.strictEqual = function strictEqual(actual, expected, message) {
		if (actual !== expected)
			fail(actual, expected, message, '===', strictEqual);

	};

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
		if (actual === expected)
			fail(actual, expected, message, '!==', notStrictEqual);

	};
	
	assert.eq = assert.equal;
	assert.notEq = assert.notEqual;
	assert.strictEq = assert.strictEqual;
	assert.notStrictEq = assert.notStrictEqual;

}());