/// <reference path="clues.js"/>
/// <reference path="Jeopardy.js"/>
/// <reference path="jquery-3.3.1.min.js"/>

"use strict";
// Initialize Firebase
firebase.initializeApp({
	apiKey: "AIzaSyBCbWdVphGh2DZno2PaFVAK-YSsv0VDMv0",
	authDomain: "jeopardy-highscores.firebaseapp.com",
	databaseURL: "https://jeopardy-highscores.firebaseio.com",
	projectId: "jeopardy-highscores",
	storageBucket: "jeopardy-highscores.appspot.com",
	messagingSenderId: "729475800664"
});
let db = firebase.firestore();

const drawBoard = () =>
{
	$(".jeopardy_screen").empty();
	let progressDiv = $("<div>").addClass("row progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped bg-primary");
	progressBarDiv.css("width","0%");
	progressDiv.append(progressBarDiv);
	let scoreDiv = $("<div>").addClass("row");
	scoreDiv.html("<p>Score: " + Jeopardy.score + "</p>")
	let boardDiv = $("<div>").addClass("row");
	Jeopardy.board.forEach(category =>
	{
		let categoryDiv = $("<div>").addClass("col-md-2 mt-3 jeopardy_category");
		let categoryTitleDiv = $("<div>").addClass("card bg-primary text-white text-center text-uppercase p-3 mb-3 jeopardy_category_heading");
		categoryTitleDiv.html("<h5>" + category.name + "</h5>");
		categoryTitleDiv.css({
			height: '8rem'
		});
		categoryDiv.append(categoryTitleDiv);
		category.clues.forEach(clue =>
		{
			let clueDiv = $("<div>").addClass("card bg-primary text-white text-center p-3 mb-1 jeopardy_clue");
			if (clue.used)
			{
				clueDiv.addClass("text-muted");
			}
			clueDiv.html("<div class='card-body'><h3>"+clue.value+"</h3></div>")
			clueDiv.data("data-answer",clue.answer);
			categoryDiv.append(clueDiv);
		});
		boardDiv.append(categoryDiv);
	});
	// start board timer.
	Jeopardy.boardTimerCountDown = Jeopardy.boardTimerDuration;
	Jeopardy.boardTimer = window.setInterval(Jeopardy.boardTimerStep, Jeopardy.stepDuration);
	$(".jeopardy_screen").append(progressDiv);
	$(".jeopardy_screen").append(boardDiv);
	progressBarDiv.animate({ width: "100%" }, Jeopardy.boardTimerDuration);
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
			Jeopardy.clueTimerCountDown = Jeopardy.clueTimerDuration;
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
	Jeopardy.clueTimerCountDown = Jeopardy.clueTimerDuration;
	Jeopardy.clueTimer = window.setInterval(Jeopardy.clueTimerStep, Jeopardy.stepDuration);
	// progress bar animation!!!
	progressBarDiv.animate({ width: "100%" }, Jeopardy.clueTimerDuration);
	$(".jeopardy_screen").append(clueDiv);
}

const drawSolution = (clue, userAnswer) =>
{
	$(".jeopardy_screen").empty();
	let solutionDiv = $("<div>").addClass("row");
	let colDiv = $("<div>").addClass("col-md-12 mt-3");
	let cardDiv = $("<div>").addClass("card text-white text-center p-4 mb-3");
	let progressDiv = $("<div>").addClass("progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped");
	progressBarDiv.css("width","0%");
	progressDiv.append(progressBarDiv);

	if (userAnswer === clue.question)
	{
		progressBarDiv.addClass("bg-success")
		cardDiv.addClass("bg-success");
		cardDiv.append("<h1>Correct!</h1>");
		clue.correct = true;
		Jeopardy.score += clue.value;
		cardDiv.append(`<h2>Score: ${Jeopardy.score}</h2>`);
		// show the solution card for only 2 seconds when the correct answer is chosen.
		Jeopardy.solutionTimerCountDown = 2000;
	}
	else
	{
		progressBarDiv.addClass("bg-danger")
		cardDiv.addClass("bg-danger");
		if (userAnswer === "")
		{
			//play time out sound
			timeUpSound.play();
			cardDiv.append("<h1>Sorry you ran out of time.</h1>");
		}
		else
		{
			cardDiv.append("<h1>"+userAnswer+" is incorrect.</h1>");
			Jeopardy.score -= clue.value;
		}
		cardDiv.append("<h1>The correct response is "+clue.question+".</h1>");
		cardDiv.append(`<h2>Score: ${Jeopardy.score}</h2>`);
		Jeopardy.solutionTimerCountDown = 3000;
	}
	cardDiv.append(progressDiv);
	colDiv.append(cardDiv);
	solutionDiv.append(colDiv);
	// start clue timer.
	Jeopardy.solutionTimer = window.setInterval(Jeopardy.solutionTimerStep, 500);
	// progress bar animation!!!
	progressBarDiv.animate({ width: "100%" }, Jeopardy.solutionTimerCountDown);
	$(".jeopardy_screen").append(solutionDiv);
};

const drawStartGame = () =>
{
	Jeopardy.correctCount = 0;
	Jeopardy.gameOver = false;
	Jeopardy.wrongCount = 0;
	Jeopardy.score = 0;
	Jeopardy.currentQuestion = null;
	Jeopardy.currentCategoryIndex = -1;
	Jeopardy.board.forEach(category =>
	{
		category.clues.forEach(clue =>
		{
			clue.used = false;
			clue.correct = false;
		})
	});
	$(".jeopardy_screen").empty();
	let startGameDiv = $("<div>").addClass("jumbotron");
	startGameDiv.html(`<h1 class="display-4">Let's Play Speed Jeopardy!</h1>
	<p class="lead">Play this mod of classic the trivia game Jeopardy!</p>
	<hr class="my-4">
	<ul>
		<li>A category will be chosen at random.</li>
		<li>There is a nine second time limit at each clue.</li>
		<li>Responses are in multiple choice</li>
		<li>Try to get to a high score!</li>
	</ul>
	<a class="btn btn-primary btn-lg" id="startButton" role="button">Start</a>
	<hr class="my-4">
	<h2>High Scores</h2>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Place</th>
				<th scope="col">Name</th>
				<th scope="col">Score</th>
			</tr>
		</thead>
		<tbody id="highscores">
		</tbody>
	</table>`);
	startGameDiv.find("#startButton").click(() => 
	{
		drawBoard();
	});
	$(".jeopardy_screen").append(startGameDiv);
	let highscoresEl = startGameDiv.find("#highscores");
	// get scores from firebase
	db.collection("highscores").orderBy("score", "desc").limit(10).get()
	.then((querySnapshot) => 
	{
		let highscores = [];
		querySnapshot.forEach((doc) => 
		{
			highscores.push(doc.data());
		});
		highscores.forEach((highscore,index,_) =>
		{
			highscoresEl.append(`
			<tr>
				<th scope="row">${index+1}</th>
				<td class="text-uppercase">${highscore.name}</td>
				<td>${highscore.score}</td>
			</tr>`);
		});
	});
};

const drawGameOver = () =>
{
	let correctCount = 0;
	let missedCount = 0;
	Jeopardy.board.forEach(cat =>
	{
		cat.clues.forEach(clue =>
		{
			if (clue.correct)
			{
				correctCount++;
			}
			else
			{
				missedCount++;
			}
		});
	});
	$(".jeopardy_screen").empty();
	let gameOverDiv = $("<div>").addClass("jumbotron");
	gameOverDiv.html(`
	<h1 class="display-4">You did it!</h1>
	<p class="lead">You got ${correctCount} clues correct and missed ${missedCount} clues.</p>
	<p class="lead">You ended up with a final score of ${Jeopardy.score}</p>
	<hr class="my-4">
	<p>Enter your name for the High Score Board:</p>
	<div class="input-group mb-3">
		<input id="name" type="text" class="form-control" placeholder="Initials" aria-label="Initials" aria-describedby="tryAgainButton">
		<div class="input-group-append">
			<button class="btn btn-outline-secondary" type="button" id="tryAgainButton">Try Again!</button>
		</div>
	</div>
	`);
	gameOverDiv.find("#tryAgainButton").click(() => 
	{
		let name = $("#name").val().trim();
		// add score to firebase
		db.collection("highscores").add({
			name: name,
			score: Jeopardy.score,
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
		drawStartGame();
	});
	$(".jeopardy_screen").append(gameOverDiv);
}

var timeUpSound = new Audio("assets/audio/timeup.ogg");

$(document).ready(function()
{
	drawStartGame();
});