const Event = require('../Structures/EventBase');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
		});
	}
	async run() {
		this.client.utils.loadInteractions()
			.then(console.log('-------------------================================----------------------'))
			.then(console.log('-------------------        INTERACTIONS DONE       ----------------------'))
			.catch(console.error);

	}
};