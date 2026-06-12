import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = await import(filePath);
    const event = eventModule.default;
    if (event.once) {
      client.once(event.name, (...args: any[]) => event.execute(...args));
    } else {
      client.on(event.name, (...args: any[]) => event.execute(...args));
    }
  }
}
