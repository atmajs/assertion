(function() {

	assert.ok = function ok(value, message) {
		if (!value)
			fail(value, true, message, '==', assert.ok);
	};


	assert.equal = function equal(actual, expected, message) {
		if (actual != expected)
			fail(actual, expected, message, '==', assert.equal);
	};

	assert.notEqual = function notEqual(actual, expected, message) {
		if (actual == expected)
			fail(actual, expected, message, '!=', assert.notEqual);
	};


	assert.strictEqual = function strictEqual(actual, expected, message) {
		if (actual !== expected)
			fail(actual, expected, message, '===', assert.strictEqual);

	};

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
		if (actual === expected)
			fail(actual, expected, message, '!==', assert.notStrictEqual);

	};

}());