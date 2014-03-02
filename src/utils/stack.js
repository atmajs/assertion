var stack_prepair;

(function(){
	
	stack_prepair = function(stack) {
		var lines = stack.split('\n'),
			startIndex = 1, endIndex = lines.length
			;
		
		var rgx_start = /(^[ \t]*at [\w\.]*assert[_\.])|(^[ \t]*at \w+\.assert)/i,
			rgx_end = /(^[ \t]*at runCase)/i
			;
		
		var i = 0, 
			imax = lines.length;
		
		while ( ++i < imax ){
			if (rgx_start.test(lines[i])) 
				startIndex = i + 1;
			
			if (rgx_end.test(lines[i])) {
				endIndex = i;
				break;
			}
		}
		
		lines.splice(endIndex);
		lines.splice(1, startIndex - 1);
		
		
		return lines.join('\n');
	};
	
}());