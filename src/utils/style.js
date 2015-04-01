var style_get;
(function(){
	
	var getters = {};
	
	// import style/box
	// import style/color
	
	style_get = function (el, property, expect) {
		var fn = getters[property];
		if (fn) {
			return fn(el, expect);
		}
		return getStyle(el, property);
	};
	
	
	function getStyle(el, property) {
		if (global.getComputedStyle == null) {
			return $(el).css(property);
		}
		
		var styles = global.getComputedStyle(el);
		var x = styles.getPropertyValue(property);
		return x === ''
			? el.style.getPropertyValue(property)
			: x;
	}
}());