const Slack = require('pico-slack');
const _ = require('lodash');
const catEmojis = ['cat', 'cat2', 'smiley_cat', 'joy_cat', 'heart_eyes_cat', 'smile_cat'];


const facts = [
	'Did you know cats whiskers are around as wide as a cats body which helps them to sense whether a space will be wide enough for them to squeeze through? Gotta watch out for my lovely lady lumps.',
	'Cats conserve energy by sleeping an average of 13 to 14 hours a day. Jealous?',
	'Cats have over 20 muscles that control their ears. So I can hear ALL the shit you talk about me.',
	'Cats can recognize the sound of your voice but just acts too cool to care. Because we are.',
	'A house cat is faster than Usain Bolt. Wheres my medal though?',
	'Cat owners are 17% more likely to have a graduate degree. The thinking mans pet',
	'A group of cats is called a clowder. Ugh, so undignified.',
	'About 50% of a cats kills are purely for entertainment purposes. So you better watch yourself.'
]

const getFact = ()=>{
	return _.sample(facts);
}

const respond = (msg)=>{
	if(Slack.msgHas(msg, 'catbot', ['hey', 'hello', 'hi', 'yo', 'meow', 'bonjour', 'whats up'])){
		//Slack.log('This is what the msg object looks like', msg);
		Slack.sendAs('Catbot', ':smirk_cat:', msg, getFact());
		Slack.react(msg, _.sample(catEmojis));
	}
};

Slack.onMessage(respond);


