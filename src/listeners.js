(function(){
	
	// wrap functions
	(function(lib, emit){
		
		for (var key in lib) {
			if (typeof lib[key] !== 'function') 
				continue;
			
			switch(key){
				case 'callback':
				case 'await':
				case 'fail':
				case 'prepairStack':
					continue;
			}
			
			if (key[0] === key[0].toUpperCase()) 
				continue;
			
			lib[key] = wrapFn(lib[key]);
		}
		
		
		function wrapFn(fn) {
			return function assert_wrapFn(){
				
				emit('start');
				
				try {
					fn.apply(this, arguments);
				} catch(error) {
					
					if (emit('fail', error) === false) 
						throw error;
					
					return;
				}
				
				emit('success');
			};
		}
		
	}(assert, emit));
	
	assert.on = function assert_on(type, listener) {
		
		if (_events[type] == null) 
			_events[type] = [];
		
		_events[type].push(listener);
	};
	
	assert.off = function assert_off(type, listener){
		
		var cbs = _events[type];
		if (cbs == null) 
			return;
		
		
		if (listener == null) {
			cbs.length = 0;
			return;
		}
		
		var i = cbs.length;
		while ( --i !== -1 ) {
			if (cbs[i] === listener)
				cbs.splice(i, 1);
		}
	};
	
	
	// = private
	
	
	var _events = {};
	
	function emit(type) {
			
		var cbs = _events[type];
		if (cbs == null) 
			return false;
		
		var i = cbs.length;
		if (i === 0) 
			return false;
		
		var args = _Array_slice.call(arguments, 1),
			fn;
			
		while ( --i !== -1 ) {
			
			fn = cbs[i];
			fn.apply(null, args);
		}
		
		return true;
	}
		
	
}());