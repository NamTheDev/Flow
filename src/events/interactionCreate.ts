import { type Interaction } from "discord.js";
import { client } from "..";

export default {
    name: "interactionCreate",
    execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            client.commands.get(interaction.commandName)?.execute(interaction);
        }
    },
};
