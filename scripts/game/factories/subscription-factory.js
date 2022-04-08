class LogicError extends Error {
	constructor(message) {
		super(message);

		this.name = "LogicError";
	}
}

class SubscriptionStorage {
	#storage = new Map();

	register(eventName) {
		if (this.#storage.has(eventName)) {
			throw new LogicError(`The "${eventName}" event already registered`);
		}

		this.#storage.set(eventName, new SubscriberCollection());
	}

	hasRegistration(eventName) {
		return this.#storage.has(eventName);
	}

	removeRegistration(eventName) {
		if (!this.#storage.has(eventName)) {
			throw new LogicError(`Could not remove registration on "${eventName}" event because it was not registered`);
		}

		this.#storage.delete(eventName);
	}

	subscribe(eventName, subscriber) {
		if (!this.#storage.has(eventName)) {
			throw new LogicError(`Could not subscribe on "${eventName}" event because it was not registered`);
		}

		const subscribers = this.#storage.get(eventName);

		subscribers.add(subscriber);
	}

	emit(eventName, data) {
		if (!this.#storage.has(eventName)) {
			throw new LogicError(`Could not emit "${eventName}" event because is was not registered`);
		}

		const subscribers = this.#storage.get(eventName);

		subscribers.notify(data);
	}
}

class SubscriberCollection {
	#subscribers = [];

	add(fn) {
		this.#subscribers.push(fn)
	}

	notify(data) {
		this.#subscribers.forEach(fn => fn(data));
	}
}

export class SubscriptionFactory {
	static createSubscriptionStorage() {
		return new SubscriptionStorage();
	}
}