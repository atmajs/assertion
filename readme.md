Assertion Library for Browsers and NodeJS
----
[![Build Status](https://travis-ci.org/atmajs/assertion.png?branch=master)](https://travis-ci.org/atmajs/assertion)

Based on NodeJS [Assert](http://nodejs.org/api/assert.html) module.


##### API

###### NodeJS API

- [Assert Documentation](http://nodejs.org/api/assert.html)

###### Additional API

- `has / hasNot`
	**Subset matching**
	
	```javascript
	
	// Substring search
	assert.has(String, String | RegExp, ?message);
	
	// Simple property existance check
	assert.has(Object, String);
	
	// Sub-object match
	assert.has(Object, Object);
	
	// Check if item exists in set
	assert.has(Array, Primitive);
	
	// Subset match
	assert.has(Array, Array);
	```
	
	> When checking arrays or objects deep matching is performed. See [tests](tree/master/test/has.test)
	
	```javascript
	
	assert.has({
		foo: 'foo',
		bar: {
			qux: {
				qux: 'qux'
				quux: 'quux'
			},
			baz: [1, 2, 3]
		}
	}, {
		foo: null,
		bar: {
			baz: [1],
			qux: {
				qux: 'qux'
			}
		}
	});
	
	```

- `is/isNot`
	**Type check**
	```javascript
		// Check by Typename
		assert.is(Any, String, ?message)
		
		// Check by Contructor (instanceof)
		assert.is(Any, Function);
	```
	Typename are extracted from `Object.prototype.toString.call`, so these are:
	```javascript
		'String'
		'Number'
		'Null'
		'Undefined'
		'Function'
		'RegExp'
		'Date'
		'Object' // any `object` will pass here
		'HTML**' // DOM Node, e.g. HTMLBodyElement
		'CustomEvent'
		...
		all other buit-in types
	```
	
- `await`
	**Wait for a callback**
	Create a wrapper function to ensure that the function is called.
	```javascript
		assert.await(
			Function/*optional - wrap function */,
			Context/*optional - use binded context */,
			Number/*optional - expectation count, default is `1`*/
		);
		
		// Example
		var fn = assert.await();
		assert.callbacks === 1;
		try {
			throw new Error()
		} catch {
			fn();
		}
		
		assert.callbacks === 0;
		
	```
	
	
