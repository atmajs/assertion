// import /src/license.txt
(function(root, factory){
	
	var _exports = {},
		_global = typeof window !== 'undefined'
		? window
		: global
		;
	
	factory(_global, _exports);
	
	include.exports = _exports;
	
}(this, function(global, exports){

	// import /src/scope-vars.js
	
	// import /src/utils/is.js
	// import /src/utils/object.js
	// import /src/utils/string.js
	
	// import /src/error.js
	// import /src/listeners.js
	
	// import /src/assert/exception.js
	// import /src/assert/callback.js
	// import /src/assert/equal.js
	// import /src/assert/deepEqual.js
	// import /src/assert/has.js
	// import /src/assert/is.js
	// import /src/assert/jquery.js
	
	

	var ok = obj_extend(assert.ok, assert);
	return (exports['assert'] = ok);
}));