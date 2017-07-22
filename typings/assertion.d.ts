declare module "assertion" {
	export = assert;
}

declare var assert: assertion.IAssert

declare var eq_: assertion.equal
declare var notEq_: assertion.notEqual
declare var lt_: assertion.lessThan
declare var lte_: assertion.lessThanOrEqaul
declare var gt_: assertion.greaterThan
declare var gte_: assertion.greaterThanOrEqual
declare var deepEq_: assertion.deepEqual
declare var notDeepEq_: assertion.notDeepEqual
declare var has_: assertion.has
declare var hasNot_: assertion.hasNot


declare namespace assertion {
	interface IAssert {
		(expression: boolean): void
		equal: equal
		notEqual: notEqual
		strictEqual: strictEqual
		notStrictEqual: notStrictEqual
		throws: throws
		notThrows: notThrows
		ifError: ifError
		lessThan: lessThan
		lessThanOrEqaul: lessThanOrEqaul
		
		greaterThan: greaterThan
		greaterThanOrEqual: greaterThanOrEqual
		deepEqual: deepEqual
		notDeepEqual: notDeepEqual
		has: has
		hasNot: hasNot

		on: on
	}
	interface equal {
		(a: any, b: any, message?: string)
	}
	interface notEqual {
		(a: any, b: any, message?: string)
	}
	interface strictEqual {
		(a: any, b: any, message?: string)		
	}
	interface notStrictEqual {
		(a: any, b: any, message?: string)			
	}
	interface throws {
		(a: Function, message?: string): Error	
	}
	interface notThrows {
		(a: Function, message?: string): Error	
	}
	interface ifError {
		(a: any, message?: string)			
	}	
	interface lessThan {
		(a: any, b: any, message?: string)
	}
	interface lessThanOrEqaul {
		(a: any, b: any, message?: string)
	}
	interface greaterThan {
		(a: any, b: any, message?: string)
	}
	interface greaterThanOrEqual {
		(a: any, b: any, message?: string)
	}
	interface deepEqual {
		(a: any, b: any, message?: string)
	}
	interface notDeepEqual {
		(a: any, b: any, message?: string)
	}
	interface has {
		(a: any, b: any, message?: string)
	}
	interface hasNot {
		(a: any, b: any, message?: string)
	}


	/** Notice: when `fail` callback is defined the assertion doesn`t throw any error */
	interface on {
		(event: 'start' | 'fail' | 'success', callback: (error?: AssertionError) => void)
	}
	

	interface AssertionError extends Error {
		actual: any
		expected: any
		operator: string
	}
}