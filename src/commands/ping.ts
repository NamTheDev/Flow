import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { client } from "..";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction: CommandInteraction) {
        const sent = await interaction.deferReply();
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiPing = client.ws.ping;
        await interaction.followUp(
            `🏓 Pong!\nRound-trip: **${latency}ms**\nAPI Latency: **${apiPing}ms**`,
        );
    },
};
