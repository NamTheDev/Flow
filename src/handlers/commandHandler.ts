import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export function loadCommands(client: Client) {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }
}
