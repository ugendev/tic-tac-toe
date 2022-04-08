import { Player } from "../enums/app-enums.js";
import { WinningMethod } from "../enums/app-enums.js";

export function checkWinner(boardModel) {
	let result;

	for (const fn of conditions) {
		result = fn(boardModel);

		if (result.winnerExists) {
			break;
		}
	}
	
	return result;
}

// Проверяет, что все значения одинаковы и не равны null
function allNotNullAndEqual(...args) {
	const [first] = args;

	return args.every(x => x === first && first !== null);
}

// Возвращает победителя
function winnerIs(mark) {
	return mark === Player.Cross
		? Player.Cross
		: Player.Zero;
}

function checkingResult(method, ...positions) {
	const winnerExists = allNotNullAndEqual(...positions); 

	if (!winnerExists) {
		return {
			winnerExists,
			winner: undefined,
			winnnigMethod: undefined,
		}
	}

	const [position] = positions; 

	return {
		winnerExists,
		winner: winnerIs(position),
		winnnigMethod: method,
	}
}

function isWinByFirstHorizontalLine(board) {
	const [
		a,	b, 	c,
		,	,   ,
		,   ,   ,
	] = board;

	return checkingResult(WinningMethod.FirstHorizontalLine, a, b, c);
}

function isWinBySecondHorizontalLine(board) {
	const [
		,	,	,
		a, 	b,	c,
		, 	,	,
	] = board;

	return checkingResult(WinningMethod.SecondHorizontalLine, a, b, c);
}

function isWinByThirdHorizontalLine(board) {
	const [
		,	,	,
		, 	,	,
		a, 	b,	c,
	] = board;

	return checkingResult(WinningMethod.ThirdHorizontalLine, a, b, c);
}

function isWinByFirstVerticalLine(board) {
	const [
		a,	 , 	 ,
		b,	 ,   ,
		c,   ,   ,
	] = board;

	return checkingResult(WinningMethod.FirstVertialLine, a, b, c);
}

function isWinBySecondVerticalLine(board) {
	const [
		,	a,	 ,
		, 	b,	 ,
		, 	c,	 ,
	] = board;

	return checkingResult(WinningMethod.SecondVerticalLine, a, b, c);
}

function isWinByThirdVerticalLine(board) {
	const [
		,	,	a,
		, 	,	b,
		, 	,	c,
	] = board;

	return checkingResult(WinningMethod.ThirdVerticalLine, a, b, c);
}

function isWinByMajorDiagonal(board) {
	const [
		a,	 ,	 ,
		, 	b,	 ,
		, 	 ,	c,
	] = board;

	return checkingResult(WinningMethod.MagorDiagonal, a, b, c);
}

function isWinByMinorDiagonal(board) {
	const [
		,	 ,	a,
		, 	b,	 ,
		c, 	 ,	 ,
	] = board;

	return checkingResult(WinningMethod.MinorDiagonal, a, b, c);
}

const conditions = [
	isWinByFirstHorizontalLine,
	isWinBySecondHorizontalLine,
	isWinByThirdHorizontalLine,

	isWinByFirstVerticalLine,
	isWinBySecondVerticalLine,
	isWinByThirdVerticalLine,

	isWinByMajorDiagonal,
	isWinByMinorDiagonal,
];