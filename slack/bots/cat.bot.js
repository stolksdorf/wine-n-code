const Slack = require('pico-slack');
const _ = require('lodash');

const facts = [
	'Did you know cats whiskers are around as wide as a cats body which helps them to sense whether a space will be wide enough for them to squeeze through? Gotta watch out for my lovely lady lumps.',
	'Cats conserve energy by sleeping an average of 13 to 14 hours a day. Jealous?',
	'Cats have over 20 muscles that control their ears. So I can hear ALL the shit you talk about me.',
	'Cats can recognize the sound of your voice but just acts too cool to care. Because we are.',
	'A house cat is faster than Usain Bolt. Wheres my medal though?' 
]

const getFact = ()=>{
	return _.sample(facts);
}

const respond = (msg)=>{
	if(Slack.msgHas(msg, 'catbot', ['hey', 'hello', 'hi', 'yo', 'meow', 'bonjour', 'whats up'])){
		//Slack.log('This is what the msg object looks like', msg);
		Slack.sendAs('Catbot', ':smirk_cat:', msg, getFact());
	}
};

Slack.onMessage(respond);

//Cat Fact 1: Did you know cats whiskers are around as wide as a cats body which helps them to sense whether a space will be wide enough for them to squeeze through? Gotta watch out for my lovely lady lumps.
//Cat Fact 2: Cats conserve energy by sleeping an average of 13 to 14 hours a day. Jealous? 
//Cat Fact 3: Cats have over 20 muscles that control their ears. So I can hear ALL the shit you talk about me.
//Cat Fact 4: Cats can recognize the sound of your voice but just acts too cool to care. Because we are. 
//Cat Fact 5: A house cat is faster than Usain Bolt. Wheres my medal though? 
