const Slack = require('pico-slack');

const gardenerReady = (msg)=>{
	if(Slack.msgHas(msg, 'gardenbot')){
		Slack.log('This is what the msg object looks like', msg);
		Slack.sendAs('Gardenbot', ':tomato:', msg, `Ready to garden ${msg.user}?`); 
	}
};

Slack.onMessage(gardenerReady);
