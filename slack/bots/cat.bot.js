const Slack = require('pico-slack');

const respond = (msg)=>{
	if(Slack.msgHas(msg, 'catbot', ['hey', 'hello', 'hi', 'yo'])){
		Slack.log('This is what the msg object looks like', msg);
		Slack.sendAs('Catbot', ':smirk_cat:', msg, `Meow meow ${msg.user}`);
	}
};

Slack.onMessage(respond);
