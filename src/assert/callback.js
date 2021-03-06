(function() {
	
	assert.callbacks = [];
	assert.await = assert_await;
	assert.avoid = assert_avoid;
	
	function assert_await() {
		
		var fn, name, ctx, count;
		
		var i = arguments.length,
			x;
		while( --i > -1) {
			x = arguments[i];
			switch(typeof x) {
				case 'function':
					fn = x;
					break;
				case 'object':
					ctx = x;
					break;
				case 'number':
					count = x;
					break;
				case 'string':
					name = x;
					break;
			}
		}
		
		if (this.callbacks == null) 
			this.callbacks = [];
		
		if (isNaN(count) || count < 1) 
			count = 1;
		
		var cbs = this.callbacks,
			obj = {
				count: count,
				name: name,
				stack: stack_prepair((new Error).stack)
			};
		
		cbs.push(obj);
		return function(){
			
			if (--obj.count === 0) 
				cbs.splice(cbs.indexOf(obj), 1);
			
			if (typeof fn !== 'function') 
				return null;
			
			return fn.apply(ctx, arguments);
		}
	}
	
	function assert_avoid() {
		var name = 'function',
			count = 0,
			ctx,
			fn;
			
		
		var i = arguments.length,
			x;
		while( --i > -1) {
			x = arguments[i];
			switch(typeof x) {
				case 'function':
					fn = x;
					break;
				case 'object':
					ctx = x;
					break;
				case 'number':
					count = x;
					break;
				case 'string':
					name = x;
					break;
			}
		}
		
		var cbs = this.callbacks;
		if (cbs == null)
			cbs = this.callbacks = [];

		return function(mix) {
			
			if (--count < 0) {
					
				var obj = {
					count: count,
					name: '<avoid>' + (name || ''),
					argument: mix
				};
				
				cbs.push(obj);
			}
			

			fn && fn.apply(ctx, arguments)
		};
	}
}());