(function() {
	
	assert.await = function(fn, ctx, count) {
		
		if (this.callbacks == null) 
			this.callbacks = 0;
		
		if (count == null) 
			count = 1;
		
		this.callbacks += count;
		
		var that = this;
		return function(){
			
			if (count-- > 0) 
				that.callbacks--;
			
			if (typeof fn !== 'function') 
				return null;
			
			return fn.apply(ctx, arguments);
		}
	};
	
}());