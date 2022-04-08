import { Player } from "../enums/app-enums.js";
import { ApplicationStore } from "../store/application-store.js";

export class MoveController extends ApplicationStore {
	#crossMove;
	#zeroMove;
	#moveControl;

	constructor() {
		super();

		this.#crossMove = document.querySelector(".cross-move");
		this.#zeroMove = document.querySelector(".zero-move");
		this.#moveControl = document.querySelector(".game__player-move");

		this.resetMoveControl();
	}

	switchPlayer() {
		const currentPlayer = this.store.get("player");

		if (currentPlayer === Player.Zero) {
			this.#setPlayer(Player.Cross);
		} else {
			this.#setPlayer(Player.Zero);
		}
	}

	#setPlayer(player) {
		if (player === Player.Cross) {
			this.#setCrossMoveVisible(true);
			this.#setZeroMoveVisible(false);

			this.store.set("player", Player.Cross);
		} else {
			this.#setCrossMoveVisible(false);
			this.#setZeroMoveVisible(true);

			this.store.set("player", Player.Zero);
		}
	}

	#setCrossMoveVisible(visible) {
		this.#crossMove.style.display = visible ? "inline" : "none";
	}

	#setZeroMoveVisible(visible) {
		this.#zeroMove.style.display = visible ? "inline" : "none";
	}

	setMoveControlVisible(visible) {
		this.#moveControl.style.display = visible ? "block" : "none"
	}

	resetMoveControl() {
		this.setMoveControlVisible(true);
		this.#setPlayer(Player.Cross);
	}
}