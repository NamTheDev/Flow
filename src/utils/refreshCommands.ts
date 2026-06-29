import { Client } from "discord.js";

export default async function refreshCommands(client: Client) {
    const commands = [...client.commands.entries()].map((entry) => {
        const { data } = entry[1];
        console.log(`\nLoading ${data.name} command.`);
        return data;
    });
    console.log("\nStarted refreshing application (/) commands.");

    await client.application?.commands.set(commands);

    console.log("\nSuccessfully reloaded application (/) commands.");
}