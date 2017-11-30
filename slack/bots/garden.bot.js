//Require in the necessary libraries
const Slack = require('pico-slack');
const _ = require('lodash');

//Example test-cases for Vegetable information
const vegetables = {
	tomato: {
		terms: ['tomato', 'tomatoes'],
		soil: 'Fertile, loose, well-drained',
		water: 'Regular, even watering',
		light: 'Full sun',
		spacing: '2 feet apart',
		DTM: '65 days',
		companions: ['Basil', 'Chives', 'Garlic']
	},
	garlic: {
		terms: ['garlic', 'garly'],
		soil: 'Fertile, loose, well-drained',
		water: 'Regular, even watering',
		light: 'Partial shade',
		spacing: '4 - 6 inches apart',
		DTM: '90 days',
		companions: ['Basil', 'Chives', 'Tomatoes']
	}
};

//find and return the object for the requested vegetable
const whichVegetable = (msg)=>{
	//Given a vegetable from the vegetables collection, check if the terms match the message text and return true or false
	const rightVegetable = (vegetable)=>{
		if (Slack.msgHas(msg, vegetable.terms)){
			return true;
		}else{
			return false;
		}
	};
	//Iterate through the vegetables object and return the object for the right vegetable
	return _.find(vegetables, rightVegetable);
};

//Format the respose for the object found by whichVegetable
const getVegetableMessage = (vegetable)=>{
	if(!vegetable){
		return 'Sorry, I couldn\'t find that vegetable';
	}else{
		const response = `*Soil*: ${vegetable.soil}
*Light*: ${vegetable.light}
*Water*: ${vegetable.water}
*Spacing*: ${vegetable.spacing}
*DTM*: ${vegetable.DTM}`;
		return response;
	}
};

//Recieve and send messages to slack
const gardenerReady = (msg)=>{
	if(Slack.msgHas(msg, 'gardenbot')){
		Slack.log('This is what the msg object looks like', msg);
		Slack.sendAs('Gardenbot', ':tomato:', msg, `Ready to garden ${msg.user}?`);
		//Send as gardenbot in the channel of the original message
		//format the vegetable message for the correct vegetable based on the text of the inital message
		Slack.sendAs('Gardenbot', ':tomato:', msg, getVegetableMessage(whichVegetable(msg.text))); 
	}
};

Slack.onMessage(gardenerReady);
