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
					method = key,
					message
					;
					
				if (is_Array(mix)) {
					message = args[args.length - 1];
					args = mix;
				}
				
				
				switch(method){
					case 'is_':
					case 'isNot_':
						if (args.length === 1) {
							var x = args[0];
							if ('visible' === x || 'hidden' === x) {
								var visibility = style_isVisible(this[0]);
								if (key === 'isNot_') {
									x = x === 'visible' ? 'hidden' : 'visible';
								}
								if ('visible' === x) {
									eq_(visibility, true, 'Element should be visible');
								}
								if ('hidden' === x) {
									eq_(visibility, false, 'Element should be hidden');
								}
								return;
							}
							args.unshift('is');
							args.push(true);
							method = 'is_' === method ? 'eq_' : 'notEq_';
						}
						break;
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
						if ($els.length === 0) {
							$els = querySelector(this, selector);
						}
						
						if ('has_' === method) {
							
							if (isNaN(count)) {
								assert_do('notEq_', $els.length, 0, message);
								return this;
							}
							
							assert_do('eq_', $els.length, count, message);
						}
						
						if ('hasNot_' === method) {
							
							if (isNaN(count)) {
								assert_do('eq_', $els.length, 0, message);
								return this;
							}
							
							assert_do('notEq_', $els.length, count, message);
						}
						
						return this;
				}
				
				var expected = args.pop(),
					x = args.shift(),
					actual
					;
					
				if (typeof x === 'string') {
					// jquery property
					actual = getActual(this, x, args, expected);
				}
				
				if (typeof x === 'function') {
					// custom function
					actual = x(this);
				}
				
				assert_do(method, actual, expected, message);
				return this;
			};
			
			function getActual($, prop, args, expected) {
				if (prop === 'css' && args.length === 1 && $.length !== 0) {
					var el = $.get(0),
						css = args[0];
					return style_get(el, css, expected);
				}
				
				var val = $[prop];
				if (typeof val === 'function') {
					return val.apply($, args);
				}
				
				return val;
			}
			
			function assert_do(method, actual, expected, message){
				
				assert[method](actual, expected, message);
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
	
	function querySelector($els, selector) {
		var set = $();
		$els.each(function(i, el){
			if (el == null || el.querySelectorAll == null)
				return;
			
			var arr = el.querySelectorAll(selector);
			set = set.add(arr);
		});
		return set;
	}
}());