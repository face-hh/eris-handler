const Event = require('../Structures/EventBase');

module.exports = class extends Event {

	async run(error) {
		console.error(error);
	}
};