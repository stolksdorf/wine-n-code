const Slack = require('pico-slack');

Slack.onMessage((msg)=>{
	if(Slack.msgHas(msg, 'wadsworth', ['hey', 'hello', 'hi', 'yo'])){
		Slack.log(msg.user, 'just said hello to me!');
		Slack.send(msg, 'Why hello');
	}
});