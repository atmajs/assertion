var style_get,
	style_isVisible;
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
	
	style_isVisible = function (el) {
		if (el == null) {
			return false;
		}
		var style = getStyle(el, 'display');
		if (style === 'none') {
			return false;
		}
		var style = getStyle(el, 'visibility');
		if (style === 'hidden') {
			return false;
		}
		return true;
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