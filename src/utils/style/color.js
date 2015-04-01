(function(){
	
	// getComputedStyle returns RGB for colors
	
	obj_extend(getters, {
		'background-color': colorDelegate('background-color'),
		'color': colorDelegate('color'),
	});
	
	function colorDelegate(property) {
		return function(styles, expect){
			return color(styles, property, expect);
		};
	}
	
	function color(styles, property, expect) {
		var current = styles.getPropertyValue(property);
		if (isEmpty(current)) {
			return current;
		}
		var x = toBrowsersColor(expect);
		if (x === current) {
			return expect;
		}
		if (isHex(expect) && isRgb(current)) {
			return toHex(current);
		}
		
		return current;
	}
	
	var rgx_RGB = /rgba? *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3})/;
	var div = null;
	
	function isRgb(any) {
		return /^rgb/.test(any);
	}
	function isHex(any) {
		return /^#/.test(any);
	}
	function isEmpty(any) {
		return any == null || any === '';
	}
	
	function toHex(rgb) {
		
		var values = rgx_RGB.exec(rgb);
		if (values == null || values.length !== 4)
			return rgb;
		
		var r = Math.round(parseFloat(values[1]));
		var g = Math.round(parseFloat(values[2]));
		var b = Math.round(parseFloat(values[3]));
		return "#" 
			+ (r + 0x10000).toString(16).substring(3).toUpperCase() 
			+ (g + 0x10000).toString(16).substring(3).toUpperCase()
			+ (b + 0x10000).toString(16).substring(3).toUpperCase();
	}
	function toBrowsersColor (any) {
		if (div == null) {
			div = document.createElement('div');
			document.body.appendChild(div);
		}
		div.styles.color = any;
		return getComputedStyle(div).color;
	}
}());