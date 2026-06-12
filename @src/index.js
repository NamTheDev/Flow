const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('../config.ts');
const loadCommands = require('./handlers/commandHandler');
const loadEvents = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();

loadCommands(client);
loadEvents(client);

client.login(token);
