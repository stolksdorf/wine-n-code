const Slack = require('pico-slack');

let isPlaying = false;
let currentQuestion;
let timer;

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
};



const beginPlaying = ()=>{
	TriviaApi.getRandomQuestion()
		.then((question)=>{
			currentQuestion = question;
			isPlaying = true;
			startTimer();
			sendQuestion();
		});
};

const sendQuestion = ()=>{
	const clue = currentQuestion;
	Slack.send('trivia-time',
		`The category is *${clue.category.title}* worth ${clue.value} points! \n ${clue.question}`);
};
const startTimer = ()=>{
	timer = setTimeout(()=>{
		Slack.send('trivia-time', 'Times nearly up!');
		timer = setTimeout(()=>{
			Slack.send('trivia-time', `Times up! The answer is *${currentQuestion.answer}*`);
			finishPlaying();
		}, 15000);
	}, 30000);
};

const finishPlaying = ()=>{
	isPlaying = false;
	currentQuestion = null;
	clearTimeout(timer);
};


Slack.onMessage((msg)=>{
	if(msg.channel != 'trivia-time') return;

	if(isPlaying){
		if(TriviaApi.isCorrect(currentQuestion, msg.text)){
			//congrats!
		}else{
			Slack.react(msg, 'no_entry_sign');
		}
	}

	if(isTriviaRequest(msg)){
		beginPlaying();
	}
});