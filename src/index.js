require('dotenv').config();

const Acol = require('./Structures/Bot');
const config = require('./Structures/BotConfig');

const client = new Acol(config);

client.connect();