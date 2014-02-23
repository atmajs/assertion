(function() {
	
	assert.callbacks = [];
	assert.await = function() {
		
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
				error: new Error
			};
			
		cbs.push(obj);
		
		return function(){
			
			if (--obj.count === 0) 
				cbs.splice(cbs.indexOf(obj), 1);
			
			if (typeof fn !== 'function') 
				return null;
			
			return fn.apply(ctx, arguments);
		}
	};
	
}());