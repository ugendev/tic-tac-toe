import { defineGroupTest, test, assert } from "../base/base.test.js";
import { MoveController } from "../../scripts/game/controllers/move-controller.js";
import { Player } from "../../scripts/game/enums/app-enums.js";
import { ApplicationStore } from "../../scripts/game/store/application-store.js";

export function runTest() {
	defineGroupTest("MoveController test", () => {
		test("Before MoveController init move control should be hidden", () => {
			const moveControl = document.querySelector(".game__player-move");

			assert(() => moveControl.style.display === "none");
		});

		test("After MoveController init move control should be visible", () => {
			new MoveController();
			const moveControl = document.querySelector(".game__player-move");
			
			assert(() => moveControl.style.display !== "none");
		});

		test("After MoveController init move should belong to cross", () => {
			new MoveController();
			const crossMoveControl = document.querySelector(".cross-move");

			assert(() => crossMoveControl.style.display !=="none");

			const applicationStore = new ApplicationStore();

			assert(() => applicationStore.store.get("player") === Player.Cross);
		});

		const controller = new MoveController();
		const applicationStore = new ApplicationStore();

		test("Switch player should work correctly", () => {
			controller.switchPlayer();

			let crossMove = document.querySelector(".cross-move");
			let zeroMove = document.querySelector(".zero-move"); 

			assert(() => crossMove.style.display === "none" && zeroMove.style.display !== "none");
			assert(() => applicationStore.store.get("player") === Player.Zero);

			controller.switchPlayer();

			assert(() => crossMove.style.display !== "none" && zeroMove.style.display === "none");
			assert(() => applicationStore.store.get("player") === Player.Cross);

			controller.switchPlayer();

			assert(() => crossMove.style.display === "none" && zeroMove.style.display !== "none");
			assert(() => applicationStore.store.get("player") === Player.Zero);
		});

		test("Reset MoveControll should work correctly", () => {
			controller.resetMoveControl();

			const moveControl = document.querySelector(".game__player-move");
			const crossMove = document.querySelector(".cross-move");
			const zeroMove = document.querySelector(".zero-move"); 

			assert(() => {
				return moveControl.style.display !== "none" && 
					crossMove.style.display !== "none" &&
					zeroMove.style.display === "none"
			});

			assert(() => applicationStore.store.get("player") === Player.Cross);
		});
	});
}