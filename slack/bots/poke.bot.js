const Slack = require('pico-slack');

const isWalk = (msg)=>{
return Slack.msgHas(msg,['walk','stroll', 'walking','strolling','jaunt','travel','skipping','run','running']);
 

	if(isWalk(msg)){
	  Slack.react(msg,'beers');
    
	};

//Slack.onMessage((msg)=>{
  
  
 // if (msg.user == 'meg.kirkl'){
 // Slack.react(msg,'beers');
//  }

//});
