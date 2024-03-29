const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));

module.exports = class Utilities {
  constructor(client) {
    this.client = client;
  }
  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  async loadInteractions() {
    const interactions = await glob(`${this.directory}/Commands/**/*.js`);
    for (const interactionFile of interactions) {
      delete require.cache[interactionFile];
      const { name } = path.parse(interactionFile);
      const File = require(interactionFile);
      const interaction = new File(this.client, name.toLowerCase());

      this.client.interactions.set(interaction.name, interaction);
      // your guild id
      this.client.createGuildCommand("881813009876520980", interaction);
      // this.client.createCommand(interaction); for global
    }
  }
  async loadEvents() {
    const events = await glob(`${this.directory}/Events/*.js`);
    for (const eventFile of events) {
      delete require.cache[eventFile];
      const { name } = path.parse(eventFile);
      const File = require(eventFile);
      const event = new File(this.client, name);

      this.client.events.set(event.name, event);
      event.emitter[event.type](name, (...args) => event.run(...args));
    }
  }
  async createInteractionCollector(options) {
    const dir = require("../Custom/interactionCollector");
    return dir.collectInteractions(options);
    //            const collector = await client.utils.createInteractionCollector({
    //                client: client,
    //                interaction: interaction,
    //                filter: ((x) => x.componentType == 2, // button
    //            });
    //
    //            collector.on('collect', async (int) => {
    //                await int.acknowledge().catch(() => {});
    //                interaction.createFollowup({ content: int.data.custom_id })
    //           })
  }
};
