const Slack = require('pico-slack');

const gardenerReady = (msg)=>{
	if(Slack.msgHas('gardenbot')){
		Slack.send(msg, 'Ready to garden ${msg.user}?'); 
	}
};

Slack.onMessage(gardenerReady);
