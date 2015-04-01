var style_get;
(function(){
	
	var getters = {};
	
	// import style/box
	// import style/color
	
	style_get = function (el, property, expect) {
		var styles = getComputedStyle(el);
		var fn = getters[property];
		if (fn) {
			return fn(styles, expect);
		}
		return styles.getPropertyValue(property);
	};
}());