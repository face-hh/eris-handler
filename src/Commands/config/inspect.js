const InteractionBase = require('../../Structures/CommandBase');
module.exports = class PingInteraction extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'inspect',
			description: 'Get information about whatever you want to know about me!',
			options: [
				{
					type: 3,
					name: 'about',
					description: 'Information about what?',
					required: true,
					choices: [
						{
							name: 'My developer',
							value: 'dev',
						},
						{
							name: 'Minigames',
							value: 'minigames',
						},
					],
				},
			],
		});
	}
	/**
   * @param {Interaction} interaction
   * @param {Client} client
   */
	async run(interaction) {
		async function buffer(url) {
			const axios = require('axios');
			const response = await axios.get(url, { responseType: 'arraybuffer' });
			return Buffer.from(response.data, 'utf-8');
		}
		if(interaction.data.options[0].value === 'dev') {
			interaction.createMessage('', { name: 'file.png', file: await buffer('https://url.png') });
		}
		else if(interaction.data.options[0].value === 'minigames') {
			interaction.createMessage('', { name: 'file.png', file: await buffer('https://url.png`) });
		}
	}
};
