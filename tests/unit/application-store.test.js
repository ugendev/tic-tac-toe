import { defineGroupTest, test, assert } from "../base/base.test.js";
import { ApplicationStore } from "../../scripts/game/store/application-store.js";

export function runTest() {
	defineGroupTest("ApplicationStore test", () => {
		class Test extends ApplicationStore {
			constructor() {
				super();
			}
		}

		const testClass = new Test();

		test("An class extended by ApplicationStore should have \"store\" property of \"object\" type", () => {
			assert(() => typeof testClass.store === "object" && testClass.store !== null);
		});

		test("Method \"set\" of \"store\" property should add data to SessionStorage", () => {
			testClass.store.set("test-key", { bar: 1 });

			assert(() => JSON.parse(sessionStorage.getItem("test-key")).bar === 1);
			sessionStorage.removeItem("test-key");
		});

		test("Method \"get\" of \"store\" property should get data from SesstionStorage", () => {
			sessionStorage.setItem("test-key", JSON.stringify("some-string"));

			const value = testClass.store.get("test-key");

			assert(() => value === "some-string");

			sessionStorage.removeItem("test-key");
		});

		test("Method \"remove\" of \"store\" property should remove as item from SesstionStorage", () => {
			sessionStorage.setItem("test-key", 1234);

			testClass.store.remove("test-key");

			const value = JSON.parse(sessionStorage.getItem("test-key"));

			assert(() => value === null);

			sessionStorage.removeItem("test-key");
		});

		test("Method \"clear\" of \"store\" property should clear SesstionStorage", () => {
			const someData = JSON.stringify({ bar: 1 });

			sessionStorage.setItem("test-key1", someData);
			sessionStorage.setItem("test-key2", someData);

			testClass.store.clear();

			const testValue1 = JSON.parse(sessionStorage.getItem("test-key1"));
			const testValue2 = JSON.parse(sessionStorage.getItem("test-key2"));

			assert(() => testValue1 === null && testValue2 === null);
		});
	});
};