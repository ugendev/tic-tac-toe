import { Player } from "../enums/app-enums.js";
import { SubscriptionFactory } from "../factories/subscription-factory.js";
import { hide, show } from "../helpers/dom-helper.js";

export class NotificationController {
	#modal;
	#backdrop;
	#eventBus;

	#COLOR_CLASSES = {
		Cross: "cross-color",
		Zero: "zero-color",
	}

	constructor() {
		this.#modal = document.querySelector(".modal");
		this.#backdrop = document.querySelector(".modal-backdrop");

		const cross = this.#modal.querySelector(".modal__cross");
		const button = this.#modal.querySelector(".modal__button");

		this.#backdrop.addEventListener("click", (event) => event.target === this.#backdrop && this.close());
		cross.addEventListener("click", () => this.close());
		button.addEventListener("click", () => this.close());

		this.#eventBus = SubscriptionFactory.createSubscriptionStorage();

		this.#eventBus.register("close");
	}

	close() {
		this.#modal.classList.add("modal--closed");
		this.#modal.addEventListener("transitionend", () => {
			hide(this.#modal);
			hide(this.#backdrop);
			this.#modal.classList.remove("modal--opened", "modal--closed");
			this.#eventBus.emit("close");
		}, { once: true });
	}

	notify(winner) {
		let winnerName;
		let textColorClass;
		let message = "Победили";

		if (winner === Player.Cross) {
			winnerName = "крестики";
			textColorClass = this.#COLOR_CLASSES.Cross;
		} else if (winner === Player.Zero) {
			winnerName = "нолики";
			textColorClass = this.#COLOR_CLASSES.Zero;
		} else {
			winnerName = "";
			textColorClass = "hidden";
			message = "Ничья";
		}

		const textContentNode = this.#modal.querySelector(".modal__winner");
		const messageContentNode = this.#modal.querySelector(".modal__message");

		messageContentNode.textContent = message;

		textContentNode.classList.remove(...Object.values(this.#COLOR_CLASSES));
		textContentNode.classList.add(textColorClass);
		textContentNode.textContent = winnerName;

		show(this.#backdrop);
		show(this.#modal);
		setTimeout(() => this.#modal.classList.add("modal--opened"), 0);
	}

	subscribe(eventName, fn) {
		this.#eventBus.subscribe(eventName, fn);
	}
}