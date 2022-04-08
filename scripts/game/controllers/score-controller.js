export class ScoreController {
	#zeroScore;
	#crossScore;

	constructor() {
		this.#crossScore = document.querySelector(".score__cross");
		this.#zeroScore = document.querySelector(".score__zero");
	}

	addPointForCross() {
		const previosScore = parseInt(this.#crossScore.getAttribute("data-score"));

		this.#crossScore.setAttribute("data-score", previosScore + 1);
	}

	addPointForZero() {
		const previosScore = parseInt(this.#zeroScore.getAttribute("data-score"));

		this.#zeroScore.setAttribute("data-score", previosScore + 1);
	}

	resetScore() {
		this.#crossScore.setAttribute("data-score", 0);
		this.#zeroScore.setAttribute("data-score", 0);
	}
}