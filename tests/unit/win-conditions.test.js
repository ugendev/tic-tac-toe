import { defineGroupTest, test, assert } from "../base/base.test.js";
import { checkWinner } from "../../scripts/game/win-conditions/win-conditions.js";
import { Player, WinningMethod } from "../../scripts/game/enums/app-enums.js";

export function runTest() {
	defineGroupTest("WinConditions test", () => {
		test("Should determine winner correctly", () => {
			const { Cross: x, Zero: o } = Player;
			const e = null;

			let board = [
				x, o, x,
				x, o, x,
				o, x, o
			];

			assert(() => checkWinner(board).winnerExists === false);

			board = [
				x, x, x,
				e, o, x,
				x, o, o,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.FirstHorizontalLine;
			});

			board = [
				x, o, o,
				x, x, x,
				o, o, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.SecondHorizontalLine; 
			});

			board = [
				x, o, o,
				o, o, x,
				x, x, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.ThirdHorizontalLine; 
			});

			board = [
				x, o, o,
				x, x, o,
				x, o, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.FirstVertialLine; 
			});

			board = [
				o, x, o,
				x, x, o,
				o, x, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.SecondVerticalLine; 
			});

			board = [
				o, o, x,
				x, o, x,
				o, x, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.ThirdVerticalLine; 
			});

			board = [
				x, o, o,
				x, x, o,
				o, x, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.MagorDiagonal; 
			});

			board = [
				o, o, x,
				x, x, o,
				x, o, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === x && result.winnnigMethod === WinningMethod.MinorDiagonal; 
			});

			board = [
				o, o, o,
				x, x, o,
				x, e, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.FirstHorizontalLine; 
			});

			board = [
				x, o, x,
				o, o, o,
				x, x, e,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.SecondHorizontalLine; 
			});

			board = [
				x, o, x,
				e, x, x,
				o, o, o,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.ThirdHorizontalLine; 
			});

			board = [
				o, e, x,
				o, x, x,
				o, x, o,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.FirstVertialLine; 
			});

			board = [
				x, o, x,
				o, o, x,
				x, o, e,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.SecondVerticalLine; 
			});

			board = [
				x, e, o,
				x, x, o,
				o, x, o,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.ThirdVerticalLine; 
			});

			board = [
				o, o, x,
				e, o, x,
				x, x, o,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.MagorDiagonal; 
			});

			board = [
				x, o, o,
				e, o, x,
				o, x, x,
			];

			assert(() => { 
				const result = checkWinner(board); 
				return result.winner === o && result.winnnigMethod === WinningMethod.MinorDiagonal; 
			});
		}); 
	});
}