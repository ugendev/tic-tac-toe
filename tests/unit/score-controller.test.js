import { defineGroupTest, test, assert } from "../base/base.test.js";
import { ScoreController } from "../../scripts/game/controllers/score-controller.js";

export function runTest() {
	defineGroupTest("ScoreController test", () => {
		const controller = new ScoreController();

		test("Initial values should be zeroes", () => {
			const crossScore = parseInt(document.querySelector(".score__cross").getAttribute("data-score"));
			const zeroScore = parseInt(document.querySelector(".score__zero").getAttribute("data-score"));

			assert(() => crossScore === 0 && zeroScore === 0);
		});

		test("Increase cross score should add 1 to score", () => {
			const crossScore = document.querySelector(".score__cross");
			const initialScore = parseInt(crossScore.getAttribute("data-score"));

			controller.addPointForCross();

			const increasedScore = parseInt(crossScore.getAttribute("data-score"));

			assert(() => initialScore === increasedScore - 1);
		});

		test("Increase zero score should add 1 to score", () => {
			const zeroScore = document.querySelector(".score__zero");
			const initialScore = parseInt(zeroScore.getAttribute("data-score"));

			controller.addPointForZero();

			const increasedScore = parseInt(zeroScore.getAttribute("data-score"));

			assert(() => initialScore === increasedScore - 1);
		});

		test("Reset score should reset both scores", () => {
			controller.addPointForCross();
			controller.addPointForCross();
			controller.addPointForCross();

			controller.addPointForZero();
			controller.addPointForZero();

			controller.resetScore();

			const crossScore = parseInt(document.querySelector(".score__cross").getAttribute("data-score"));
			const zeroScore = parseInt(document.querySelector(".score__zero").getAttribute("data-score"));

			assert(() => crossScore + zeroScore === 0);
		});
	});	
}