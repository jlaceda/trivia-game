/// <reference path="clues.js"/>

"use strict";

// the trivia object
let Jeopardy = {
	// flags
	gameOver: false,
	
	correctCount: 0,
	wrongCount: 0,
	score: 0,
	currentClue: null,

	highScores:
	[
		{
			name: "wtsn",
			score: 18000
		},
		{
			name: "john",
			score: 1000
		},
		{
			name: "alex",
			score: 2000
		},
		{
			name: "kenj",
			score: 5000
		},
	],

	stepDuration: 500,
	clueTimerDuration: 9000,
	solutionTimerDuration: 3000,
	boardTimerDuration: 2000,
	board: [
		moneymoneymoney,
		weregoingtothemovies,
		thechroniclesofnarnia,
		popculture,
		scienceguys,
		theresawaron,
	],

	currentCategoryIndex: -1,

	// TODO: The following function probably don't need to be methods

	// These TimerStep functions will be passed into window.setInterval
	// so "this" will be window. Don't use "this".
	// also this isn't very DRY. TODO: fix that.
	clueTimerStep: () =>
	{
		Jeopardy.clueTimerCountDown -= Jeopardy.stepDuration;
		if (Jeopardy.clueTimerCountDown < 0)
		{
			// reset things
			window.clearInterval(Jeopardy.clueTimer);
			Jeopardy.clueTimer = null;
			Jeopardy.clueTimerCountDown = Jeopardy.clueTimerDuration;
			// then:
			timeUpSound.play();
			drawSolution(Jeopardy.currentClue, '');
		}
	},
	solutionTimerStep: () =>
	{
		Jeopardy.solutionTimerCountDown -= Jeopardy.stepDuration;
		if (Jeopardy.solutionTimerCountDown < 0)
		{
			// reset things
			window.clearInterval(Jeopardy.solutionTimer);
			Jeopardy.solutionTimer = null;
			Jeopardy.solutionTimerCountDown = Jeopardy.solutionTimerDuration;
			// then:
			Jeopardy.currentClue = null;
			drawBoard();
		}
	},
	boardTimerStep: () =>
	{
		Jeopardy.boardTimerCountDown -= Jeopardy.stepDuration;
		if (Jeopardy.boardTimerCountDown < 0)
		{
			// reset things
			window.clearInterval(Jeopardy.boardTimer);
			Jeopardy.boardTimer = null;
			Jeopardy.boardTimerCountDown = Jeopardy.boardTimerDuration;
			// then:
			Jeopardy.pickRandomClue();
			if (Jeopardy.gameOver)
			{
				drawGameOver();
				return;
			}
			drawClue();
		}
	},
	pickRandomClue: () =>
	{
		// make sure theres still clues left;
		let categoriesDone = [];
		let allCategoriesDone = true;
		for (let i = 0; i < Jeopardy.board.length; i++)
		{
			categoriesDone[i] = categoryIsDone(i)
			if (!categoriesDone[i])
			{
				allCategoriesDone = false;
			}
		}
		if (allCategoriesDone)
		{
			Jeopardy.gameOver = true;
			return;
		}

		// TODO: pick a random category
		// but go through the whole category first before
		// picking a new random category

		// pick first random category
		if (Jeopardy.currentCategoryIndex === -1)
		{
			Jeopardy.currentCategoryIndex = randomIndex(Jeopardy.board.length);
		}

		// check if current category has clues left
		if (categoriesDone[Jeopardy.currentCategoryIndex])
		{
			// pick new random category
			Jeopardy.currentCategoryIndex = -1;
			while (Jeopardy.currentCategoryIndex === -1)
			{
				// pick a new category
				let randCat = randomIndex(Jeopardy.board.length);
				if (!categoryIsDone(randCat))
				{
					Jeopardy.currentCategoryIndex = randCat;
				}
			}
		}

		// at this point we should have a valid currentCategoryIndex
		// pick the next unused clue
		while (Jeopardy.currentClue === null)
		{
			let clues = Jeopardy.board[Jeopardy.currentCategoryIndex].clues;
			for (let i = 0; i < clues.length; i++)
			{
				const clue = clues[i];
				if (!clue.used)
				{
					Jeopardy.currentClue = clue;
					break;
				}
			}
		}
	},
	addHighScore: (name, score) =>
	{
		Jeopardy.highScores.push({
			name: name,
			score: score,
		});
	},
};

// random index from array length
const randomIndex = arrayLength =>
{
	return Math.floor(Math.random() * arrayLength);
};

const categoryIsDone = index =>
{
	let isDone = true;
	Jeopardy.board[index].clues.forEach(clue =>
	{
		if (!clue.used)
		{
			isDone = false;
		}
	});
	return isDone;
};

// validate that each answer has a question
Jeopardy.board.forEach(category =>
{
	category.clues.forEach(clue =>
	{
		if (clue.responses.indexOf(clue.question) === -1)
		{
			console.error(category.name +": "+ clue.value + " does not have an answer.")
		}
	})
	
});