import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { config } from "dotenv";

config();

const commands: any[] = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

try {
  console.log("Started refreshing application (/) commands.");
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: commands }
  );
  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
