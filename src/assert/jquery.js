(function(){
	assert.setDOMLibrary = setDOMLibrary;
	assert.$ = {};
	
	var $ = global.$ || global.jQuery || global.Zepto || global.Kimbo;
	if ($ == null) 
		return;
	
	setDOMLibrary($);
	
	function setDOMLibrary($) {
		
		var Proto =  {};
		var METHODS =  [
			'eq_',
			'notEq_',
			
			'deepEq_',
			'notDeepEq_',
			
			'has_',
			'hasNot_',
			
			'is_',
			'isNot_',
			
			'lt_',
			'lte_',
			'gt_',
			'gte_',
		];
		
		METHODS.forEach(function (key) {
			Proto[key] = function assert_jquery(mix){
				var args = _Array_slice.call(arguments),
					message
					;
					
				if (is_Array(mix)) {
					message = args[args.length - 1];
					args = mix;
				}
				
				
				switch(key){
					case 'has_':
					case 'hasNot_':
						var selector = args[0];
						if (typeof selector !== 'string') 
							break;
						
						if (this[selector] != null && args.length !== 1) 
							break;
						
						var count = args[1],
							$els = this.find(selector);
						if ($els.length === 0) 
							$els = this.filter(selector);
						
						if ('has_' === key) {
							
							if (isNaN(count)) {
								assert_do('notEq_', $els.length, 0, message);
								return this;
							}
							
							assert_do('eq_', $els.length, count, message);
						}
						
						if ('hasNot_' === key) {
							
							if (isNaN(count)) {
								assert_do('eq_', $els.length, 0, message);
								return this;
							}
							
							assert_do('notEq_', $els.length, count, message);
						}
						
						return this;
					
					
				}
				
				var expected = args.pop(),
					fn = args.shift()
					;
					
				if (typeof fn === 'string') {
					
					assert_byProperty(key, this, fn, args, expected, message);
					return this;
				}
				
				if (typeof fn === 'function') {
					
					assert_byFunction(key, this, fn, expected, message);
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
			function assert_do(key, actual, expected, message){
				
				assert[key](actual, expected, message);
			}
		});
		
		METHODS.forEach(function (key) {
			assert.$[key] = function(){
				var args = _Array_slice.call(arguments),
					ctx = args.shift();
					
				return Proto[key].apply(ctx, args);
			};
			
			if ($.fn[key] !== void 0) 
				return;
			
			$.fn[key] = Proto[key];
		});
		
	}
	
	
}());