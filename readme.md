Assertion Library for Browsers and NodeJS
----
[![Build Status](https://travis-ci.org/atmajs/assertion.png?branch=master)](https://travis-ci.org/atmajs/assertion)

Based on NodeJS [Assert](http://nodejs.org/api/assert.html) module. And is part of the [uTest](https://github.com/atmajs/utest) Library.

_As a standalone module can be found in NPM repository_
```bash
npm install assertion
```

##### API

###### NodeJS API

- [Assert Documentation](http://nodejs.org/api/assert.html)

###### Additional API

- `has / hasNot`

	**Subset matching**
	```javascript
	// Substring search
	assert.has(String, String | RegExp, ?message);
	
	// Simple property existence check
	assert.has(Object, String);
	
	// Sub-object match
	assert.has(Object, Object);
	
	// Check if item exists in set
	assert.has(Array, Primitive);
	
	// Subset match
	assert.has(Array, Array);
	```
	
	> When checking arrays or objects, deep matching is performed. See [tests](https://github.com/atmajs/assertion/blob/master/test/has.test)
	
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
	Typename is extracted from `Object.prototype.toString.call`, so these are:
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
		all other built-in types
	```

- jQuery

	**jQuery Assertion Extensions**
	```javascript
		$.fn.$eq
		$.fn.$notEq
		$.fn.$deepEq
		$.fn.$notDeepEq
		$.fn.$has
		$.fn.$hasNot
	```
	Functions API:
	- Get Property
		- ``` (Key, Expected) ```
		- ``` ([Key, Expected], message) ```
	- Function call
		- ``` (FnName [, ...arguments], Expected) ```
		- ``` ([FnName [, ...arguments], Expected], message) ```
	
	**`has/hasNot`** 
	- Node Find/Filter Assertions
		- ``` (Selector, ?ExpectedCount) ```
	
	
	Example:
	```javascript
	// <div class='container' id='foo'>
	//		<h4>Baz</h4>
	//		<span>Qux</span>
	// </div>
	
	$('.container')
		.$eq('length', 1)
		.$eq('attr', 'id', 'foo')
		.$eq('hasClass', 'container', true)
		
		.children()
		.$eq('length', 2)
		.$has('html', 'span')
		
		.filter('h4')
		.$eq('length', 1)
		.$eq('text', 'Baz')
		;
		
	$('.container')
		.$has('h4')
		.$hasNot('h1')
		;
	```
	

- `await`

	_**Wait for a callback**_
	
	Creates a wrapper function to ensure that the function is called.
	```javascript
		// ! Arguments order does not matter
		var fn = assert.await(
			String   /* optional - name of this wrapper*/
			Function /* optional - wrap the function*/,
			Object   /* optional - use binded context*/,
			Number   /* optional - expectation count, default is `1`*/
		);
		
		// creates item in assert.callbacks
		[
			{
				name: String,
				error: Error, // to receive the stack trace
				count: Number
			}
		];
		
		// after the `fn` function is called `count` times, then the object is removed
		// from the callbacks set
		
		
		// Example
		var fn = assert.await();
		assert.callbacks.length === 1;
		try {
			throw new Error()
		} catch {
			fn();
		}
		
		assert.callbacks.length === 0;
		
	```
	
- Listener
	
	You can attach listener to the assertions.
	Event Types:
	- start
	- fail
		> if `fail` type listener is attached, then exceptions are not thrown.
	- success
	
	```javascript
	// sample
	assert.on('fail', function(error){
		error instanceof assert.AssertionError;
	});
	```
