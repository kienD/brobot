const Botkit = require('botkit');

const controller = Botkit.slackbot({debug: true});

const bot = controller.spawn({token: process.env.slackToken}).startRTM();

controller.hears(
	['hello', 'hi'],
	'direct_message,direct_mention,mention',
	function(bot, message) {
		bot.api.reactions.add(
			{
				channel: message.channel,
				name: 'robot_face',
				timestamp: message.ts
			},
			(err, res) => {
				if (err) {
					bot.botkit.log('Failed to add emoji reaction :(', err);
				}
			}
		);

		controller.storage.users.get(
			message.user,
			(err, user) => {
				if (user && user.name) {
					bot.reply(message, 'Hello ' + user.name + '!');
				}
				else {
					bot.reply(message, 'Hello!');
				}
			}
		);
	}
);