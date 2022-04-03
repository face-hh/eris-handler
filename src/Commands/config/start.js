const InteractionBase = require('../../Structures/CommandBase');
module.exports = class PingInteraction extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'read',
			description: 'READ THE DOCS!',
			options: [
				{
					type: 6,
					name: 'friend',
					description: 'Who to tell',
					required: true,
				},
			],
		});
	}
	async run(interaction) {
		const who = interaction.data.options[0].value;
		interaction.createFollowup({ content: `<@${who}> read the docs! https://abal.moe/Eris` });
	}
};
