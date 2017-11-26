const _ = require('lodash');
const glob = require('glob');
const Slack = require('pico-slack');


const config = require('nconf')
	.argv()
	.env({lowerCase: true})
	.file('environment', {file: `config/${process.env.NODE_ENV}.json`})
	.file('defaults', {file: 'config/default.json'});



Slack.setInfo('wadsworth', ':tophat:');



const loadBots = ()=>{
	glob.sync('./bots/**/*.bot.js').map((botpath)=>{
		try {
			require(botpath);
			console.log('loaded', botpath);
		} catch (err){
			console.log(err);
			Slack.error('Bot Load Error', botpath, err);
		}
	});
}

Slack.connect(config.get('slack_bot_token'))
	.then(()=>loadBots())
	.then(()=>Slack.debug('Rebooted!'))
	.catch((err)=>Slack.error(err));