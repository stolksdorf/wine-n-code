const Slack = require('pico-slack');

Slack.onMessage((msg)=>{
	if(Slack.msgHas('wadsworth', ['hey', 'hello', 'hi', 'yo'])){
		Slack.send(msg, 'Why hello');
	}
});