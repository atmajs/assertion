/*!
 * assertion v%IMPORT(version)%
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, %YEAR%
 */

(function (root, factory) {
    'use strict';

    var _global = typeof window === 'undefined' || window.navigator == null ? global : window;
	var _isCommonJs = typeof exports !== 'undefined' && (root == null || root === exports || root === _global);
	var _isAmd = typeof define === 'function' && define.amd;

    function exportsGlobal(){
        factory(_global, _global);
    }
	function exportsLibrary() {
		var exports = {};
		factory(_global, exports);
		return exports.assert;
	}

	if (_isCommonJs) {
		return (module.exports = exportsLibrary());
	}
	if (_isAmd) {
		return define(exportsLibrary);
	}

    return exportsGlobal();

}(this, function (global, exports) {
    'use strict';

	// import /src/exports.js

}));
