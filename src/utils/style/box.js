(function(){
	// Mainly for the FireFox support
	// as for instance 'padding' returns empty string
	
	obj_extend(getters, {
		'border-width': boxSizeDelegate('border-%anchor-width'),
		'padding': boxSizeDelegate('padding-%anchor'),
		'margin': boxSizeDelegate('margin-%anchor'),
	});
	
	function boxSizeDelegate(pattern) {
		return function(el){
			return boxSize(el, pattern);
		};
	}
	function boxSize(el, pattern) {
		var sizes = [];
		var equal = true;
		var prev  = null;
		(['top', 'right', 'bottom', 'left']).forEach(function(anchor){
			var style = pattern.replace('%anchor', anchor),
				val = getStyle(el, style);
			
			equal = prev == null || prev === val;
			prev  = val;
			
			sizes.push(val);
		});
		if (equal) {
			return sizes[0];
		}
		return sizes.join(' ');
	}
	
}());
