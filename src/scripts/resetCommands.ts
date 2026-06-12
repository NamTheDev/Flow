import { REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

try {
  console.log("Started resetting application (/) commands.");
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: [] }
  );
  console.log("Successfully reset application (/) commands.");
} catch (error) {
  console.error(error);
}
