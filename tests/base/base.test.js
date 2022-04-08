class TestError extends Error {
	constructor(message) {
		super(message);
		this.name = "TestError";
	}
}

export function defineGroupTest(groupTestName, testBody) {
	console.group(groupTestName);

	testBody();

	console.groupEnd();
}

export function test(testName, testBody) {
	console.group(testName);

	try {
		testBody();
		console.log("\x1b[32m%s\x1b[0m", 'Test passed');
	} catch(error) {
		if (error.name !== TestError.name) {
			console.error(error);
		}

		console.log("\x1b[31m%s\x1b[0m", 'Test failed');
	}

	console.groupEnd();
}

export function assert(conditionFn) {
	if (!conditionFn()) {
		throw new TestError();
	}
}

export function countCalls(fn) {
	let callsCount = 0;

	let observer = function(...args) {
		callsCount += 1;
		observer.callsCount = callsCount;

		return fn(...args);
	}

	return observer;
}