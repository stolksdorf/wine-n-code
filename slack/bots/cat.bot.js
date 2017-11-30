const Slack = require('pico-slack');

const respond = (msg)=>{
	if(Slack.msgHas(msg, 'wadsworth', ['hey', 'hello', 'hi', 'yo'])){
		Slack.log('This is what the msg object looks like', msg);
		Slack.send(msg, `Why hello ${msg.user}`);
	}
}

Slack.onMessage(respond);
