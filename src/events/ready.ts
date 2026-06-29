import { Client } from "discord.js";
import refreshCommands from "../utils/refreshCommands";

export default {
    name: "clientReady",
    once: true,
    async execute(client: Client) {
        console.log(`\nLogged in as ${client.user?.tag}.`);

        await refreshCommands(client);

        console.log(`\nLoaded all commands, total: ${client.commands.size}.`);
    },
};
