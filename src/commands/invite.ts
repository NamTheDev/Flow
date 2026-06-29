import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    OAuth2Scopes,
    PermissionFlagsBits,
    MessageFlags,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Get the bot's invite link."),
    async execute(interaction: ChatInputCommandInteraction) {
        const inviteLink = interaction.client.generateInvite({
            scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
            permissions: [PermissionFlagsBits.Administrator],
        });

        return interaction.reply({
            content: `Invite me here: [open link][${inviteLink}]`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
