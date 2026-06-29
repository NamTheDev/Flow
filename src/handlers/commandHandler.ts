import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export async function loadCommands(client: Client) {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
        file.endsWith(".ts"),
    );

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);
        if (client.commands instanceof Collection) {
            client.commands.set(command.default.data.name, command.default);
        }
    }
}
