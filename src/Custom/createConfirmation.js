class CreateConfirmation {
	async start(client, interaction, user1, user2, callback) {

		const IDconfirmation_1 = String(Math.random());
		const IDconfirmation_2 = String(Math.random());
		let i = 0;
		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						custom_id: IDconfirmation_1,
						style: 1,
						label: `${user1.username.slice(0, 4) + '...'} ready!`,
					},
					{
						type: 2,
						custom_id: IDconfirmation_2,
						style: 3,
						label: `${user2.username.slice(0, 4) + '...'} ready!`,
					},
				],
			},
		];

		interaction.createMessage({
			content: 'First, let\'s if we all are here!',
			components: componentsArray,
		});

		const collector = await client.utils.createInteractionCollector({
			client: client,
			interaction: interaction,
			filter: function(ea) { return ea.member.id === user1.id || ea.member.id === user2.id; },
		});

		collector.on('collect', async int => {
			await int.acknowledge();

			if(IDconfirmation_1 === int.data.custom_id && int.member.id === user1.id) {
				i++;
				componentsArray[0].components[0].disabled = true;

				interaction.editOriginalMessage(`${user1.username.slice(0, 4)}... showed up!`);
			}
			if(IDconfirmation_2 === int.data.custom_id && int.member.id === user2.id) {
				i++;
				componentsArray[0].components[1].disabled = true;

				interaction.editOriginalMessage(`${user2.username.slice(0, 4)}... showed up!`);
			}
			int.editOriginalMessage({
				components: componentsArray,
			});
			if(i === 2) {
				callback();
				collector.stopListening('end');
			}
		});
	}

}

module.exports = CreateConfirmation;