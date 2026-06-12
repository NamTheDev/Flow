import { Client, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./handlers/eventHandler";
import { loadCommands } from "./handlers/commandHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

await loadEvents(client);
await loadCommands(client);

client.login(process.env.DISCORD_TOKEN);
