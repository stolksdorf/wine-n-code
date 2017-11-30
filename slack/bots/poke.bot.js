const Slack = require('pico-slack');
//Is there a message

Slack.onMessage((msg)=>{
  
  if (msg.user == 'meg.kirkl'){
  Slack.react(msg,'beers');
  }

});
