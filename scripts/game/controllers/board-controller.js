import { CellPositionsByWinningMethod, Player } from "../enums/app-enums.js";
import { SubscriptionFactory } from "../factories/subscription-factory.js";
import { getChildIndex } from "../helpers/dom-helper.js";
import { ApplicationStore } from "../store/application-store.js";
import { checkWinner } from "../win-conditions/win-conditions.js";

export class BoardController extends ApplicationStore {
	#board;
	#boardModel = [
		null, null, null,
		null, null, null,
		null, null, null
	]

	#crossTemplate;
	#zeroTemplate;

	#subscribersStorage;

	constructor() {
		super();

		this.#subscribersStorage = SubscriptionFactory.createSubscriptionStorage();
		this.#subscribersStorage.register("move");
		this.#subscribersStorage.register("win");
		this.#subscribersStorage.register("before-win");
		this.#subscribersStorage.register("draw");

		this.#board = document.querySelector(".game__grid");
		this.#init();
	}

	#init() {
		this.#board.addEventListener("click", (event) => this.#handleBoardClick(event));
		this.#crossTemplate = document.getElementById("cross-template");
		this.#zeroTemplate = document.getElementById("zero-template");
	}

	#handleBoardClick(event) {
		if (!event.target.classList.contains("grid__cell")) {
			return;
		}

		const t = this.#board;
		const clickedCellIndex = getChildIndex(t, event.target);

		if (this.#boardModel[clickedCellIndex] !== null) {
			return;
		}

		const currentPlayer = this.store.get("player");

		this.#fillCell(event.target, currentPlayer);
		this.#boardModel[clickedCellIndex] = currentPlayer;

		const result = this.#tryDetermineWinner();

		if (result.winnerExists) {
			this.#subscribersStorage.emit("before-win");
			this.#disableBoard();
			this.#highlightWinner(result.winnnigMethod)
				.then(() => this.#subscribersStorage.emit("win", result));
		} else if (this.#boardModel.every(cell => cell !== null)) {
			this.#subscribersStorage.emit("draw");
		} else {
			this.#subscribersStorage.emit("move");
		}
	}

	#fillCell(cell, currentPlayer) {
		let template;

		if (currentPlayer === Player.Cross) {
			template = this.#crossTemplate.content.cloneNode(true);
		} else {
			template = this.#zeroTemplate.content.cloneNode(true);
		}

		cell.appendChild(template);
	}

	#tryDetermineWinner() {
		const temp = this.#boardModel;
		const result = checkWinner(temp);

		return result;
	}

	#disableBoard() {
		this.#board.classList.add("game__grid--disabled");
	}

	#highlightWinner(winnnigMethod) {
		const winningMethodCellIndexes = CellPositionsByWinningMethod[winnnigMethod];
		const cells = Array.from(this.#board.querySelectorAll(".grid__cell"));
		const cellsToHighlight = cells.filter((_, idx) => !winningMethodCellIndexes.includes(idx));

		cells.forEach(cell => { 
			cell.classList.add("transitioned", "transparent-border")
			cell.addEventListener("transitionend", () => cell.classList.remove("transitioned"), { once: true });
		});

		cellsToHighlight.forEach(cell => cell.classList.add("grid__cell--lighten"));

		return new Promise((resolve) => {
			this.#board.addEventListener("transitionend", resolve, { once: true });
		});
	}

	reset() {
		this.#boardModel.fill(null);
		this.#board.classList.remove("game__grid--disabled");
		Array.from(this.#board.children).forEach(cell => {
			cell.innerHTML = "";
			cell.classList.remove("transparent-border", "grid__cell--lighten");
		});
	}

	subscribe(eventName, subscriber) {
		this.#subscribersStorage.subscribe(eventName, subscriber);
	}
}