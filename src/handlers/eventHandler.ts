import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }
}
