# Slack bots

Slack bots communicate with Slack using a "Web Socket", which is kinda like a continous API call that goes in both directions. Wadsworth manages this socket connection for you, so you can just focus on the lgic of your bot.

The API behind Slack is quite large and complex, so I wrote a simple library, called [pico-slack](https://github.com/stolksdorf/pico-slack), that makes it very easy to do common things in Slack; Receive and send messages and emojis.

## How to make your own

When Wadsworth loads, he looks in the `/bots` folder for all files named `*.bot.js`, eg. `myAwesome.bot.js` and then loads them. To make a new bot, click into the bot folder and hit the small plus button to create a new file. Name it anything and end it with `.bot.js`.

To make edits to your bot, click the bot file and hit the little pencil icon. Make your edits and hit the commit button at the bottom. It will take about a minute for the server to reboot and load your changes. Watch the `#diagnostics` channel for messages when the server reboots.

*What if my code is bad?!* Don't worry! Wadsworth double checks each bot before he loads, if there are any errors, he won't load it and tell you whats wrong with it in the `diagnostics` channel. If you need any help understanding the messages just let me know :)