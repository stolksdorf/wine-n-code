const Slack = require('pico-slack');

//Bring in our file that contains the logic for interacting with our trivia API
const TriviaApi = require('./trivia.api.js');

// 'let' indicates variables that will change in value, so here we can tracking some
// states our trivia bot can be in
let isPlaying = false;
let currentQuestion;
let timer;

// This function checks if a msg is a trivia request.
// If we are already playing, it can't be a request
// It then checks for variantations in Wadsworth names, and also many ways to trigger another question
const isTriviaRequest = (msg)=>{
	const wadsworthNames = [
		'wadsworth', 'wads', 'waddles', 'wadz','good sir',
		'old chap', 'old boy', 'wiggles'
	];
	return !isPlaying && Slack.msgHas(msg, wadsworthNames, [
		'trivia', 'another', 'question', 'hit me', 'quiz', 'once more',
		'keep em coming', 'keep \'em coming', 'don\'t stop', 'brain buster', 'hit it',
		'brain teaser', 'yet more', 'even more'
	]);

};

// This is an object of functions that all send messages to Slack
// It's nice to collect like functions under and object for organization
// Eventually, if this gets large, we could bump this into it's own file to keep the rest of the logic
// In this file succinct
const respond = {
	question : ()=>{
		Slack.send('trivia-time',
			`The category is *${currentQuestion.category.title}* worth ${currentQuestion.value} points!`
			+ `\n> ${currentQuestion.question}`);
	},
	nearly : ()=>{
		Slack.send('trivia-time', 'The clock is ticking...');
	},
	timesup : ()=>{
		Slack.send('trivia-time', `Times up! The answer is *${currentQuestion.answer}*`);
	},
	congrats : (person)=>{
		Slack.send('trivia-time', `Congrats ${person}! :tada: You get a gold star :star:`);
	}
}

// This function does everything needs to begin playing a round
//  Its good to name your functions like actions. It makes your code easy to read
const beginPlaying = ()=>{
	TriviaApi.getRandomQuestion()
		.then((question)=>{
			// After the API responds back with our question
			// Update our state variables, kick off the timer, and message the channel
			currentQuestion = question;
			isPlaying = true;
			startTimer();
			respond.question();
		})
		// If there's an error for whatever reason, log it to the diagnostics channel for debugging
		.catch((err)=>Slack.error(err));
};

const startTimer = ()=>{
	// Sets a timer for 25 secs to let players know time is almost up
	timer = setTimeout(()=>{
		respond.nearly();
		// Sets another timer for 10 secs to end the round
		timer = setTimeout(()=>{
			// Messages that the time is up
			respond.timesup();
			finishPlaying();
		}, 10 * 1000);
	}, 25 * 1000);
};

// This function cleans up all of our state variables and brings us back into where we started
// ready to play again
const finishPlaying = ()=>{
	isPlaying = false;
	currentQuestion = null;
	clearTimeout(timer);
};


Slack.onMessage((msg)=>{
	// If the message was not in the trivia-time channel, we don't care about it.
	// End the function early
	if(msg.channel != 'trivia-time') return;

	// If we are playing we want to check the message to see if that's right
	if(isPlaying){
		if(TriviaApi.isCorrect(currentQuestion, msg.text)){
			// If the answer is right, praise the player, then clean up for another round
			respond.congrats(msg.user);
			finishPlaying();
		}else{
			// If they are wrong, let them know by reacting to their message with an emoji
			Slack.react(msg, 'no_entry_sign');
		}
	}

	// If the message is actually a trivia request, let's play!
	if(isTriviaRequest(msg)){
		beginPlaying();
	}
});