/// <reference path="jquery-3.3.1.min.js"/>
// the questions
// http://www.j-archive.com/showgame.php?game_id=5454
let moneymoneymoney =
{
	name: "money, money, money",
	clues:
	[
		{
			value: 200,
			answer: "The name of this British monetary unit comes from a unit of weight",
			responses: [
				"kilogram",
				"farthing",
				"pound",
				"quid",
			],
			question: "pound",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "From 1792 to 1873 the U.S. issued silver 5-cent coins called not nickels but 'half' these",
			responses: [
				"quarter",
				"dollar",
				"nickel",
				"dime",
			],
			question: "dime",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "The Lincoln Memorial is on the back of this U.S. bill",
			responses: [
				"$100",
				"$50",
				"$10",
				"$5",
			],
			question: "$5",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "A silver tetradrachm from the 300s B.C. features a great portrait of him",
			responses: [
				"Apollo",
				"Ptolemy",
				"Alexander the Great",
				"Pyrrhus of Epirus",
			],
			question: "Alexander the Great",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "English settlers in the New World used this word from Algonquian for beads used as Indian money",
			responses: [
				"pence",
				"wampum",
				"roenoke",
				"doubloon",
			],
			question: "wampum",
			used: false,
			correct: false,
		}
	]
};

let weregoingtothemovies = 
{
	name: "we're going to the movies",
	clues:
	[
		{
			value: 200,
			answer: "My favorite part of going is watching the previews called these, like something a car pulls",
			responses: [
				"camper",
				"literalize",
				"trailers",
				"screening",
			],
			question: "trailers",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "I love this format that gives \"up to 40% more image\" & \"highest quality 3D\"",
			responses: [
				"4K",
				"IMAX",
				"3D",
				"BluRay",
			],
			question: "IMAX",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "The ticket guy knows me, so I'm front row center for this 2016 monster movie sequel with an address for a title",
			responses: [
				"10 Cloverfield Lane",
				"Wolf on Wall Street",
				"21 Jump Street",
				"A Nightmare on Elm Street",
			],
			question: "10 Cloverfield Lane",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "",
			responses: [
				"4K",
				"IMAX",
				"3D",
				"BluRay",
			],
			question: "IMAX",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "",
			responses: [
				"4K",
				"IMAX",
				"3D",
				"BluRay",
			],
			question: "IMAX",
			used: false,
			correct: false,
		}
	]
}

let board = [
	moneymoneymoney,
	moneymoneymoney,
	moneymoneymoney,
	moneymoneymoney,
	moneymoneymoney,
	moneymoneymoney,
]

// validate that each answer has a question
board.forEach(category =>
{
	category.clues.forEach(clue =>
	{
		if (clue.responses.indexOf(clue.question) === -1)
		{
			console.error(category.name +": "+ clue.value + " does not have an answer.")
		}
	})
	
});

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

// the trivia object
let Jeopardy = {
	// flags
	gameOver: false,
	
	correctCount: 0,
	wrongCount: 0,
	score: 0,
	currentClue: null,

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

}

const drawBoard = () =>
{
	$(".jeopardy_screen").empty();
	let boardDiv = $("<div>").addClass("row");
	board.forEach(category =>
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
	$(".jeopardy_screen").append(boardDiv);
}

const drawClue = (clue, category) =>
{
	clue.used = true;
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
			drawSolution(clue,resButton.text());
		});
		responsesDiv.append(resButton);
	});
	// TODO: progress bar animation.
	let progressDiv = $("<div>").addClass("progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped bg-danger");
	progressBarDiv.css("width","50%");
	progressDiv.append(progressBarDiv);
	cardDiv.append("<div class='card-header'>"+category+" for $"+clue.value+"</div>")
	cardDiv.append("<h1>"+clue.answer+"</h1>");
	cardDiv.append(responsesDiv);
	cardDiv.append(progressDiv);
	colDiv.append(cardDiv);
	clueDiv.append(colDiv);
	$(".jeopardy_screen").append(clueDiv);
}

const drawSolution = (clue, userAnswer) =>
{
	$(".jeopardy_screen").empty();
	let solutionDiv = $("<div>").addClass("row");
	let colDiv = $("<div>").addClass("col-md-12 mt-3");
	let cardDiv = $("<div>").addClass("card text-white text-center p-4 mb-3");

	// TODO: progress bar animation.
	let progressDiv = $("<div>").addClass("progress");
	let progressBarDiv = $("<div>").addClass("progress-bar progress-bar-striped bg-primary");
	progressBarDiv.css("width","50%");
	progressDiv.append(progressBarDiv);

	if (userAnswer === clue.question)
	{
		cardDiv.addClass("bg-success");
		cardDiv.append("<h1>Correct!</h1>");
		clue.correct = true;
	}
	else
	{
		cardDiv.addClass("bg-danger");
		if (userAnswer === "")
		{
			cardDiv.append("<h1>Sorry you ran out of time.</h1>");
		}
		else
		{
			cardDiv.append("<h1>"+userAnswer+" is incorrect.</h1>");
		}
		cardDiv.append("<h1>The correct response is "+clue.question+".</h1>");
	}
	cardDiv.append(progressDiv);
	colDiv.append(cardDiv);
	solutionDiv.append(colDiv);
	$(".jeopardy_screen").append(solutionDiv);
}

$(document).ready(function()
{
	//drawBoard();
	drawClue(moneymoneymoney.clues[0], moneymoneymoney.name);
	//drawSolution(moneymoneymoney.clues[3],"Alexander the Great");
	//drawSolution(moneymoneymoney.clues[3],"");
	//drawSolution(moneymoneymoney.clues[3],"Apollo");
	//resetClues();
});