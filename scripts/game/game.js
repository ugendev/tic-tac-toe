import { ScoreController } from "./controllers/score-controller.js";
import { MoveController } from "./controllers/move-controller.js";
import { BoardController } from "./controllers/board-controller.js";
import { Player } from "./enums/app-enums.js";
import { NotificationController } from "./controllers/notification-controller.js";

export class Game {
	#moveController;
	#scoreController;
	#boardController;
	#notificationController;

	#restartButton;
	#resetButton;

	constructor() {
		this.#moveController = new MoveController();
		this.#scoreController = new ScoreController();
		this.#boardController = new BoardController();
		this.#notificationController = new NotificationController();

		this.#restartButton = document.querySelector(".button-restart");
		this.#resetButton = document.querySelector(".button-reset");

		this.#resetButton.addEventListener("click", () => this.#resetScore());
		this.#restartButton.addEventListener("click", () => this.#restartGame());

		this.#boardController.subscribe("move", () => this.#handleMove());
		this.#boardController.subscribe("before-win", () => this.#blockControls());
		this.#boardController.subscribe("draw", () => this.#handleDraw());
		this.#boardController.subscribe("win", (eventData) => this.#handleWin(eventData));

		this.#notificationController.subscribe("close", () => this.#restartGame());
	}

	#handleMove() {
		this.#moveController.switchPlayer();
	}

	#blockControls() {
		this.#restartButton.setAttribute("disabled", true);
		this.#resetButton.setAttribute("disabled", true);
	}

	#unblockControls() {
		this.#restartButton.removeAttribute("disabled");
		this.#resetButton.removeAttribute("disabled");
	}

	#restartGame() {
		this.#moveController.resetMoveControl();
		this.#boardController.reset();
	}

	#resetScore() {
		this.#scoreController.resetScore();
	}

	#handleWin(eventData) {
		this.#unblockControls();

		eventData.winner === Player.Cross
			? this.#scoreController.addPointForCross()
			: this.#scoreController.addPointForZero();

		this.#moveController.setMoveControlVisible(false);
		this.#notificationController.notify(eventData.winner);
	}

	#handleDraw() {
		this.#notificationController.notify(null);
	}
}