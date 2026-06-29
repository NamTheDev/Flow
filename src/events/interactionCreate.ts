import { type Interaction } from "discord.js";
import { client } from "..";

export default {
    name: "interactionCreate",
    async execute(interaction: Interaction) {
        if (interaction.isChatInputCommand() && interaction.inGuild()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            await command.execute(interaction).catch(console.error);
            console.log(
                `\nCommand ${interaction.commandName} executed by ${interaction.user.username}.`,
            );
        }
    },
};
