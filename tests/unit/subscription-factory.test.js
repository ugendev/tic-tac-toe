import { SubscriptionFactory } from "../../scripts/game/factories/subscription-factory.js";
import { defineGroupTest, test, assert, countCalls } from "../base/base.test.js";

export function runTest() {
	defineGroupTest("SubscriptionFactory test", () => {
		test("SubscriptionFactory should produce different instanses", () => {
			const firstStorage = SubscriptionFactory.createSubscriptionStorage();
			const secondStorage = SubscriptionFactory.createSubscriptionStorage();

			assert(() => firstStorage !== secondStorage);
		});

		test("Event registration should work correctly", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();

			storage.register("test-event");

			assert(() => storage.hasRegistration("test-event"));

			storage.removeRegistration("test-event");

			assert(() => !storage.hasRegistration("test-event"));
		});

		test("Register on existing event should throw an error", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();

			storage.register("test-event");
			
			assert(() => {
				try {
					storage.register("test-event");
					return false;
				} catch (error) {
					if (error.name === "LogicError") {
						return true;
					}

					return false;
				}
			});
		});

		test("Remove registration non-existent event should threw as Error", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();

			assert(() => {
				try {
					storage.removeRegistration("non-existent-event-name")

					return false;
				} catch (error) {
					if (error.name === "LogicError") {
						return true
					}

					return false;
				}
			});
		});

		test("Subscribe on non-existent event should threw an error", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();

			assert(() => {
				try {
					storage.subscribe("non-existent-event-name");
					return false;
				} catch (error) {
					if (error.name === "LogicError") {
						return true;
					}

					return false;
				}
			});
		});

		test("Emit non-existent event should threw an error", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();
			
			assert(() => {
				try {
					storage.emit("non-existent-event-name", 1234);
					return false;
				} catch (error) {
					if (error.name === "LogicError") {
						return true;
					}

					return false;
				}
			});
		});

		test("Subscription logic should work correctly", () => {
			const storage = SubscriptionFactory.createSubscriptionStorage();

			let dataOfEvent;
			const subscriber = (data) => { dataOfEvent = data };
			const observableSubscriber = countCalls(subscriber);

			storage.register("test-event");
			storage.subscribe("test-event", observableSubscriber);

			storage.emit("test-event", "work");

			assert(() => observableSubscriber.callsCount === 1);
			assert(() => dataOfEvent === "work");

			storage.emit("test-event", "work2");

			assert(() => observableSubscriber.callsCount === 2);
			assert(() => dataOfEvent === "work2");
		});
	});
};