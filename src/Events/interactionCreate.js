const Eris = require('eris');
const Event = require('../Structures/EventBase');

module.exports = class extends Event {

	async run(interaction) {
		if(interaction instanceof Eris.CommandInteraction) {

			if (!interaction.guildID) return;
			try {
				const command = this.client.interactions.get(interaction.data.name);
				if (!command) return;
				if(!interaction.options) return await command.run(interaction);
				return await command.run(
					interaction,
					interaction.options._options.map((value) => value.value),
				);
			}
			catch (err) {
				interaction.createMessage({
					content: 'Something went wrong!',
					ephemeral: true,
				});
				console.log(err);
			}
		}

	}
};