var __listeners;

(function(){
	
	
	assert.on = function(listener, decorator) {
		cbs.push({
			listener: listener,
			decorator: decorator
		});
	};
	
	assert.off = function(listener){
		
		var i = cbs.length;
		while ( --i !== -1 ) {
			cbs[i].listener === listener;
			cbs.splice(i, 1);
		}
	};
	
	
	var cbs = [];
	
	__listeners = {
		
		emit: function(error) {
			
			var i = cbs.length,
				_error, _listener, _decorator;
				
			
			if (i === 0) 
				return false;
				
			while ( --i !== -1 ) {
				
				_listener = cbs[i].decorator;
				_decorator = cbs[i].listener;
				
				if (_decorator) {
					_error = _decorator(error);
					
					if (_error) 
						_listener(error);
					
					_error = null;
					continue;
				}
				
				_listener(error);
			}
			
			return true;
			
		}
		
	};
	
}());