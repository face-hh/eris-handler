const { Client } = require('eris');
const Utils = require('./BotUtils.js');

module.exports = class BotClient extends Client {
	constructor(options = {}) {
		super(options.token, { restMode: true });

		this.validate(options);

		this.interactions = new Map();
		this.devMode = true;
		this.events = new Map();
		this.utils = new Utils(this);
		this.games = require('./BotGames');
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		this.token = options.token;
		this.prefix = options.prefix;
		this.developers = options.developers;
		this.devMode = options.devmode;

	}

	async connect() {
		this.utils.loadEvents()
			.then(console.log('-------------------================================----------------------'))
			.then(console.log('-------------------           EVENTS DONE          ----------------------'))
			.catch(console.error);

		await super.connect();
	}
};