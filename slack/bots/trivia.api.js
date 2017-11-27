const _ = require('lodash');

//Library that easily lets us make HTTP requests easily
const request = require('superagent');

// A list of all the Question IDs we have asked
let askedQuestions = {};


// Takes a string and returns an array of important words for us to check against

// The cryptic looking stuff in the `words` and `replace` functions is called 'regular expressions' or regex
// It's a syntax for describing how to match text _very_ efficiently. To be honest is pretty black magic
// I always google how to use it.
const getWordArray = (string)=>{
	const dumbWords = ['the', 'their', 'sir', 'its', 'a', 'an', 'and', 'or', 'to', 'thing', 'things'];
	return _.chain(string)
		// takes a string and splits it in to words using ' ', '/', and '-' as delimiters
		.words(/[^ \/-]+/g)
		.map((word)=>{
			// converts to lowercase
			return word.toLowerCase()
				// removes html tags and punctuation
				.replace(/<[^>]*>/g, '')
				.replace(/\W+/g, '')
				// removes trailing 's' or 'es'
				.replace(/s$/, '');
		})
		// Filters out the dumb words
		.filter((word)=>{
			if(word && !_.includes(dumbWords, word)) return true;
		})
		.value()
};


//Processes the question object sent back from the API
const cleanQuestion = (question)=>{
	//Remove HTML from the answer
	question.answer = question.answer.replace(/<\/?[^>]+(>|$)/g, "");
	return question;
};

const TriviaApi = {

	// Calls the Jeopordy API to get a random question. If that question has already been asked, it keeps trying
	getRandomQuestion : ()=>{
		// Call The Jeopordy API
		return request.get(`http://jservice.io/api/random`)
			.send()
			.then((result)=>{
				// Get out the question object from the response.
				// The response will often have a bunch of additional information
				return result.body[0];
			})
			.then((question)=>{
				//Keep getting a new random question if we've already had the same one
				if(askedQuestions[question.id]){
					return TriviaApi.getRandomQuestion();
				}else{
					//Add this question to the asked list
					askedQuestions[question.id] = true;

					// Returned the cleaned up question
					return cleanQuestion(question);
				}
			})
	},

	// This function checks if the attempted answer to the question is correct
	// It does this by breaking down both the actual and attempted answer strings into a list of important words
	// Removing out puncuation, simple words like 'and' or 'the', and removes capitalization
	// Then for each word in the acutal answer, there must be that word in the attmpted answer
	// If that is true, this function will return true.
	isCorrect : (question, attemptedAnswer)=>{
		if(!attemptedAnswer) return false;

		const attemptedWords = getWordArray(attemptedAnswer);
		const actualWords    = getWordArray(question.answer);

		// For every word in the actual answer, there should be a mathcing word in the attempted answer
		return _.every(actualWords, (answerWord)=>{
			return _.includes(attemptedWords, answerWord);
		});
	}
};

module.exports = TriviaApi;