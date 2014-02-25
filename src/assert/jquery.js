(function(){
	assert.setDOMLibrary = setDOMLibrary;
	
	var $ = global.$ || global.jQuery || global.Zepto || global.Kimbo;
	if ($ == null) 
		return;
	
	setDOMLibrary($);
	
	function setDOMLibrary($) {
		
		[
			'$eq',
			'$notEq',
			
			'$deepEq',
			'$notDeepEq',
			
			'$has',
			'$hasNot',
			
			'$is',
			'$isNot'
		]
		.forEach(function(key){
			
			$.fn[key] = function assert_jquery(mix){
				var args = _Array_slice.call(arguments),
					message
					;
					
				if (is_Array(mix)) {
					message = args[args.length - 1];
					args = mix;
				}
				
				var expected = args.pop(),
					fn = args.shift()
					;
				
				
				if (typeof fn === 'string') {
					
					assert_byProperty(key.substring(1), this, fn, args, expected, message);
					return this;
				}
				
				if (typeof fn === 'function') {
					
					assert_byFunction(key.substring(1), this, fn, expected, message);
					return this;
				}
				
				return this;
			};
			
			
			function assert_byProperty(key, $, prop, args, expected, message) {
				var val = $[prop];
				
				if (typeof val === 'function') 
					val = val.apply($, args);
				
				assert[key](val, expected, message);
			}
			
			function assert_byFunction(key, $, fn, expected, message) {
				var val = fn($);
				
				assert[key](val, expected, message);
			}
			
		});
		
	}
	
	
}());