/// <reference path="jquery-3.3.1.min.js"/>

"use strict";

// resets the clues array
const resetClues = () =>
{
	board.forEach(category =>
	{
		category.clues.forEach(clue =>
		{
			clue.used = false;
			clue.correct = false;
		})
	});
}

// random index from array length
const randomIndex = arrayLength =>
{
	return Math.floor(Math.random() * arrayLength);
}

const TEN_SECONDS = 10000;

// the trivia object
let Jeopardy = {
	// flags
	gameOver: false,
	
	correctCount: 0,
	wrongCount: 0,
	score: 0,
	currentClue: null,

	clueTimer: null,
	clueTimerCountDown: TEN_SECONDS,
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
	clueTimerStep: () =>
	{
		Jeopardy.clueTimerCountDown -= 500;
		if (Jeopardy.clueTimerCountDown < 0)
		{
			window.clearInterval(Jeopardy.clueTimer);
			Jeopardy.clueTimer = null;
			Jeopardy.clueTimerCountDown = TEN_SECONDS;
			drawSolution(Jeopardy.currentClue, '');
		}
	},
	solutionTimerStep: () =>
	{
		Jeopardy.solutionTimerCountDown -= 500;
		if (Jeopardy.solutionTimerCountDown < 0)
		{
			window.clearInterval(Jeopardy.solutionTimer);
			Jeopardy.solutionTimer = null;
			Jeopardy.solutionTimerCountDown = 3000;
			Jeopardy.currentClue = null;
			drawBoard();
		}
	},
	boardTimerStep: () =>
	{
		Jeopardy.boardTimerCountDown -= 500;
		if (Jeopardy.boardTimerCountDown < 0)
		{
			window.clearInterval(Jeopardy.boardTimer);
			Jeopardy.boardTimer = null;
			Jeopardy.boardTimerCountDown = TEN_SECONDS/2;
			pickRandomClue();
			if (Jeopardy.gameOver)
			{
				drawGameOver();
				return;
			}
			drawClue();
		}
	}

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

const pickRandomClue = () =>
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
			Jeopardy.currentClue = Jeopardy.board[randCat].clues[randClue];
		}
	}
};

const drawGameOver = () =>
{

}

const drawBoard = () =>
{
	$(".jeopardy_screen").empty();
	let boardDiv = $("<div>").addClass("row");
	Jeopardy.board.forEach(category =>
	{
		let categoryDiv = $("<div>").addClass("col-md-2 mt-3 jeopardy_category");
		let categoryTitleDiv = $("<div>").addClass("card bg-primary text-white text-center text-uppercase p-3 mb-3 jeopardy_category_heading");
		categoryTitleDiv.html("<h5>" + category.name + "</h5>")
		categoryDiv.append(categoryTitleDiv);
		category.clues.forEach(clue =>
		{
			let clueDiv = $("<div>").addClass("card bg-primary text-white text-center p-3 mb-1 jeopardy_clue");
			if (clue.used)
			{
				clueDiv.addClass("text-muted");
			}
			clueDiv.html("<div class='card-body'><h3>$"+clue.value+"</h3></div>")
			clueDiv.data("data-answer",clue.answer);
			categoryDiv.append(clueDiv);
		});
		boardDiv.append(categoryDiv);
	});
	// start board timer.
	Jeopardy.boardTimerCountDown = TEN_SECONDS/2;
	Jeopardy.boardTimer = window.setInterval(Jeopardy.boardTimerStep, 500);
	$(".jeopardy_screen").append(boardDiv);
}

const drawClue = () =>
{
	let clue = Jeopardy.currentClue;
	let category = Jeopardy.board[Jeopardy.currentCategoryIndex].name;
	clue.used = true,
	
	$(".jeopardy_screen").empty();
	let clueDiv = $("<div>").addClass("row");
	let colDiv = $("<div>").addClass("col-md-12 mt-3");
	let cardDiv = $("<div>").addClass("card bg-primary text-white text-center text-uppercase p-4 mb-3");
	let responsesDiv = $("<div>").addClass("card-body text-white");
	clue.responses.forEach((res) =>
	{
		let resButton = $("<button>").addClass("btn btn-dark btn-lg btn-block response");
		resButton.text(res);
		resButton.click(() => {
			window.clearInterval(Jeopardy.clueTimer);
			Jeopardy.clueTimer = null;
			Jeopardy.clueTimerCountDown = TEN_SECONDS;
			drawSolution(clue,resButton.text());
		});
		responsesDiv.append(resButton);
	});
	let progressDiv = $("<div>").addClass("progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped bg-danger");
	progressBarDiv.css("width","0%");
	progressDiv.append(progressBarDiv);
	cardDiv.append("<div class='card-header'>"+category+" for "+clue.value+"</div>")
	cardDiv.append("<h1>"+clue.answer+"</h1>");
	cardDiv.append(responsesDiv);
	cardDiv.append(progressDiv);
	colDiv.append(cardDiv);
	clueDiv.append(colDiv);

	// start clue timer.
	Jeopardy.clueTimerCountDown = TEN_SECONDS;
	Jeopardy.clueTimer = window.setInterval(Jeopardy.clueTimerStep, 500);
	// progress bar animation!!!
	progressBarDiv.animate({ width: "100%" }, TEN_SECONDS);
	$(".jeopardy_screen").append(clueDiv);
}

const drawSolution = (clue, userAnswer) =>
{
	$(".jeopardy_screen").empty();
	let solutionDiv = $("<div>").addClass("row");
	let colDiv = $("<div>").addClass("col-md-12 mt-3");
	let cardDiv = $("<div>").addClass("card text-white text-center p-4 mb-3");
	let progressDiv = $("<div>").addClass("progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped bg-primary");
	progressBarDiv.css("width","0%");
	progressDiv.append(progressBarDiv);

	if (userAnswer === clue.question)
	{
		cardDiv.addClass("bg-success");
		cardDiv.append("<h1>Correct!</h1>");
		clue.correct = true;
		Jeopardy.score += clue.value;
	}
	else
	{
		// TODO: play wrong answer sound
		cardDiv.addClass("bg-danger");
		if (userAnswer === "")
		{
			cardDiv.append("<h1>Sorry you ran out of time.</h1>");
		}
		else
		{
			cardDiv.append("<h1>"+userAnswer+" is incorrect.</h1>");
			Jeopardy.score -= clue.value;
		}
		cardDiv.append("<h1>The correct response is "+clue.question+".</h1>");
	}
	cardDiv.append(progressDiv);
	colDiv.append(cardDiv);
	solutionDiv.append(colDiv);
	// start clue timer.
	Jeopardy.solutionTimerCountDown = 3000;
	Jeopardy.solutionTimer = window.setInterval(Jeopardy.solutionTimerStep, 500);
	// progress bar animation!!!
	progressBarDiv.animate({ width: "100%" }, 3000);
	$(".jeopardy_screen").append(solutionDiv);
};

const drawStartGame = () =>
{
	Jeopardy.startTrivia();
	$(".jeopardy_screen").empty();
	let startGameDiv = $("<div>").addClass("jumbotron");
	startGameDiv.html(`
	<h1 class="display-4">Let's Play Jeopardy!</h1>
	<p class="lead">Play this mod of classic the trivia game Jeopardy!</p>
	<hr class="my-4">
	<ul>
		<li>A clue will be given at random.</li>
		<li>There is a ten second time limit at each clue.</li>
		<li>Try to get to a high score!</li>
	</ul>
	<a class="btn btn-primary btn-lg" href="#" id="startButton" role="button">Start</a>
	<hr class="my-4">
	<h2>High Scores</h2>
	`);
	startGameDiv.find("#startButton").click(() => 
	{
		drawBoard();
	});
	let highscores = $("ol");
	Jeopardy.highScores.forEach((highscore) =>
	{
		highscores.append("<li class='text-uppercase text-monospace'>" + highscore.name + " " + highscore.score + "</li>")
	});
	startGameDiv.append(highscores);
	$(".jeopardy_screen").append(startGameDiv);
};

$(document).ready(function()
{
	drawStartGame();
	//drawBoard();
	//Jeopardy.currentClue = moneymoneymoney.clues[0];
	//Jeopardy.currentCategoryIndex = 0;
	//drawClue();
	//drawSolution(moneymoneymoney.clues[3],"Alexander the Great");
	//drawSolution(moneymoneymoney.clues[3],"");
	//drawSolution(moneymoneymoney.clues[3],"Apollo");
	//resetClues();
});