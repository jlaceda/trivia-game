# trivia-game
UW Coding Bootcamp Unit 5 Homework

## Homework Specifications
- [X] You'll create a trivia game that shows only one question until the player answers it or their time runs out.
- [X] If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.
- [X] The scenario is similar for wrong answers and time-outs.
- [X] If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
- [X] If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
- [ ] On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

## Initial Thoughts (Pseudo Code)
```
question object:
	question string,
	choices string[],
	correctAnswer string,
	answered bool,
	correct bool,
	(maybe)imageUrl string,
	(maybe)audioUrl string,

game object:
	question[],
	gameOver bool,
	correctCount int,
	wrongCount int,
	currentQuestionIndex int,

methods:
	startGame
		reset score
		reset ui
		show start page

	startQuestion(question object)
		get new question
		randomize answer order
		show question
		start question timer

	checkQuestion(question, answer)
		do the actual check for correct answer
		return correct?

	showQuestionResult()
		checkQuestion(currentquestion, answer)
		correct ?
			showQuestionResult(true)
		:
			showQuestionResult(false)
			show correct answer
			startNextQuestionTimer
			startNextQuestion
		start question result timer
		show congrats
		startNextQuestionTimer -> startNextQuestion

	questionTimeEnd
		showQuestionResult()

	startNextQuestion
		are there more questions ?
			pick a question randomly
			startQuestion(question object)
		:
			gameOver
			showEndPage
```
