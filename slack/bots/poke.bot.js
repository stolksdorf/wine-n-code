const Slack = require('pico-slack');
//Is there a message

Slack.onMessage((msg)=>{
  
  if (msg.user == 'meg'){
  Slack.react(msg,'beers');
  }

});
