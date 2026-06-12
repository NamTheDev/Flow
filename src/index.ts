import { Client, GatewayIntentBits, Collection } from "discord.js";
import { loadEvents } from "./handlers/eventHandler";
import { loadCommands } from "./handlers/commandHandler";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, { data: any; execute: (interaction: CommandInteraction) => Promise<void> }>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
}) as Client & { commands: Collection<any, any> };

client.commands = new Collection();

await loadEvents(client);
await loadCommands(client);

client.login(process.env.DISCORD_TOKEN);
