const Slack = require('pico-slack');

Slack.onMessage((msg)=>{
	if(Slack.msgHas(msg, 'gardenbot')){
		Slack.send(msg, 'Ready to garden ${msg.user}?'); 
	}
});
