const _ = require('lodash');
const request = require('superagent');

let askedQuestions = [];


// takes a string and splits it in to words using ' ', '/', and '-' as delimiters
// converts to lowercase
// removes html tags and punctuation
// removes trailing 's' or 'es'
const stringToCleanWordArray = (string)=>{
	return _.chain(string)
		.words(/[^ \/-]+/g)
		.map((word)=>{
			return word.toLowerCase()
				.replace(/<[^>]*>/g, '')
				.replace(/\W+/g, '')
				.replace(/s$/, '');
		})
		.filter()
		.value();
};

const TriviaApi = {
	getRandomQuestion : ()=>{
		return request.get(`http://jservice.io/api/random`)
			.send()
			.then((result)=>{
				if(askedQuestions[result.id]){
					//Keep getting a new random question if we've already had the same one
					return TriviaApi.getRandomQuestion();
				}else{
					askedQuestions[result.id] = true;
					return result;
				}
			})
	},

	isCorrect : (question, attemptedAnswer)=>{
		if(!answer) return false;
		const dumbWords = ['the', 'their', 'sir', 'its', 'a', 'an', 'and', 'or', 'to', 'thing', 'things'];

		const attemptedWords = cleanWordArray(attemptedAnswer);
		const actualWords = cleanWordArray(question.answer);

		//each answer word must appear in the message, except for dumb words
		return _.every(actualWords, (answerWord)=>{
			if(_.includes(dumbWords, answerWord)) return true;
			return _.includes(attemptedWords, answerWord);
		});
	}
};

module.exports = TriviaApi;