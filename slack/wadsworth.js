const glob = require('glob');
const Slack = require('pico-slack');

const slackBotToken = process.env.slack_bot_token || require('./local.json').slack_bot_token;

Slack.setInfo('wadsworth', ':tophat:');

const loadBots = ()=>{
	glob.sync('./bots/**/*.bot.js', {cwd : './slack'}).map((botpath)=>{
		try {
			require(botpath);
			console.log('loaded', botpath);
		} catch (err){
			console.log(err);
			Slack.error('Bot Load Error', botpath, err);
		}
	});
}

Slack.connect(slackBotToken)
	.then(()=>loadBots())
	.then(()=>Slack.debug('Wadsworth Rebooted'))
	.catch((err)=>Slack.error(err));