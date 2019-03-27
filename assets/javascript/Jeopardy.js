/// <reference path="clues.js"/>

"use strict";

const TEN_SECONDS = 10000;
const STEP_DURATION = 500;

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
	clueTimerDuration: 10000,
	solutionTimerDuration: 3000,
	boardTimerDuration: 4000,
	board: [
		moneymoneymoney,
		weregoingtothemovies,
		moneymoneymoney,
		weregoingtothemovies,
		moneymoneymoney,
		weregoingtothemovies,
	],

	currentCategoryIndex: 0,

	// Trivia methods
	startTrivia: () => 
	{
		this.correctCount = 0;
		this.gameOver = false;
		this.wrongCount = 0;
		this.currentQuestion = null;
	},
	startQuestion: () => 
	{
		// pick a question

	},
	resetClues: () =>
	{
		this.board.forEach(category =>
		{
			category.clues.forEach(clue =>
			{
				clue.used = false;
				clue.correct = false;
			})
		});
	},
	getScore: () =>
	{

	},

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
		let thereAreStillUnusedClues = false;
		Jeopardy.board.forEach(category =>
		{
			category.clues.forEach(clue =>
			{
				if (!clue.used)
				{
					thereAreStillUnusedClues = true;
					return;
				}
			});
			if (thereAreStillUnusedClues)
			{
				return;
			}
		});

		if (!thereAreStillUnusedClues)
		{
			Jeopardy.gameOver = true;
			return;
		}

		while (Jeopardy.currentClue === null)
		{
			let randCat = randomIndex(Jeopardy.board.length);
			let randClue = randomIndex(Jeopardy.board[randCat].clues.length);

			if (!Jeopardy.board[randCat].clues[randClue].used)
			{
				Jeopardy.currentCategoryIndex = randCat;
				Jeopardy.currentClue = Jeopardy.board[randCat].clues[randClue];
			}
		}
	},
};