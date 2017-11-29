const Slack = require('pico-slack');

const gardenerReady = (msg)=>{
	if(Slack.msgHas(msg, 'gardenbot')){
		Slack.send(msg, 'Ready to garden ${msg.user}?'); 
	}
};

Slack.onMessage(gardenerReady);
