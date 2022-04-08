// Тип игрока
export const Player = Object.freeze({
	Cross: 1,
	Zero: 2,
});

// Метод победы (за счет чего произошел выигрыш)
export const WinningMethod = Object.freeze({
	FirstHorizontalLine: 1,
	SecondHorizontalLine: 2,
	ThirdHorizontalLine: 3,
	FirstVertialLine: 4,
	SecondVerticalLine: 5,
	ThirdVerticalLine: 6,
	MagorDiagonal: 7,
	MinorDiagonal: 8,
});

// Позиции ячеек в зависимости от метода победы
export const CellPositionsByWinningMethod = Object.freeze({
	[WinningMethod.FirstHorizontalLine]: [0, 1, 2],
	[WinningMethod.SecondHorizontalLine]: [3, 4, 5],
	[WinningMethod.ThirdHorizontalLine]: [6, 7, 8],
	[WinningMethod.FirstVertialLine]: [0, 3, 6],
	[WinningMethod.SecondVerticalLine]: [1, 4, 7],
	[WinningMethod.ThirdVerticalLine]: [2, 5, 8],
	[WinningMethod.MagorDiagonal]: [0, 4, 8],
	[WinningMethod.MinorDiagonal]: [2, 4, 6],
});