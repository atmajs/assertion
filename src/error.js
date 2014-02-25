var fail;

(function() {

	fail = function(actual, expected, message, operator, stackStartFunction) {
		
		var error = new AssertionError({
			message: message,
			actual: actual,
			expected: expected,
			operator: operator,
			stackStartFunction: stackStartFunction
		});
		
		throw error;
	};

	assert.AssertionError = AssertionError;
	assert.fail = fail;
	
	
	// private

	// {message, actual, expected }
	function AssertionError(options) {
		this.name = 'AssertionError';
		this.actual = options.actual;
		this.expected = options.expected;
		this.operator = options.operator;

		if (options.message) {
			this.message = options.message;
			this.generatedMessage = false;
		} else {
			this.message = getMessage(this);
			this.generatedMessage = true;
		}
		
		var stackStartFunction = options.stackStartFunction || fail;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, stackStartFunction);
		} else {
			
			this.stack = new Error().stack;
		}
		
		this.stack = prepairStack(this.stack);
	};
	obj_inherit(AssertionError, Error);

	function getMessage(error) {
		var str_actual = JSON.stringify(error.actual, replacer),
			str_expected = JSON.stringify(error.expected, replacer);

		return str_truncate(str_actual, 128) + ' ' + error.operator + ' ' + str_truncate(str_expected, 128);
	}


	function replacer(key, value) {
		if (is_Undefined(value))
			return '' + value;

		if (is_Number(value) && (isNaN(value) || !isFinite(value)))
			return value.toString();

		if (is_Function(value) || is_RegExp(value))
			return value.toString();

		return value;
	}
	
	
	function prepairStack(stack) {
		
		var lines = stack.split('\n'),
			startIndex = 1, endIndex = lines.length
			;
		
		var rgx_start = /(^[ \t]*at assert[_\.])|(^[ \t]*at \w+\.assert)/i,
			rgx_end = /(^[ \t]*at runCase)/i
			;
		
		var i = 0, 
			imax = lines.length;
		
		while ( ++i < imax ){
			if (rgx_start.test(lines[i])) 
				startIndex = i + 1;
			
			if (rgx_end.test(lines[i])) {
				endIndex = i;
				break;
			}
		}
		
		lines.splice(endIndex);
		lines.splice(1, startIndex - 1);
		
		
		return lines.join('\n');
	}

}());