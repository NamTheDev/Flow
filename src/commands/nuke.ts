import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    MessageFlags,
    Guild,
} from "discord.js";

async function nukeChannels(guild: Guild, currentChannelId: string) {
    const channels = await guild.channels.fetch();
    for (const [, channel] of channels) {
        if (
            channel &&
            channel.id !== currentChannelId &&
            channel.type !== ChannelType.GuildCategory
        ) {
            await channel.delete().catch(() => null);
        }
    }
}

async function nukeCategories(guild: Guild) {
    const channels = await guild.channels.fetch();
    for (const [, channel] of channels) {
        if (channel?.type === ChannelType.GuildCategory) {
            await channel.delete().catch(() => null);
        }
    }
}

async function nukeRoles(guild: Guild) {
    const roles = await guild.roles.fetch();
    const me = guild.members.me ?? (await guild.members.fetchMe());
    const botHighestRole = me.roles.highest.position;

    for (const [, role] of roles) {
        if (
            !role.managed &&
            role.id !== guild.id &&
            role.position < botHighestRole
        ) {
            await role.delete().catch(() => null);
        }
    }
}

export default {
    data: new SlashCommandBuilder()
        .setName("nuke")
        .setDescription("For mass management.")
        .addSubcommand((subcommand) =>
            subcommand.setName("channels").setDescription("Nuke all channels."),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("categories")
                .setDescription("Nuke all categories."),
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("roles").setDescription("Nuke roles."),
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("all").setDescription("Nuke everything."),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: ChatInputCommandInteraction) {
        const { guild } = interaction;
        if (!guild) return;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "channels") {
            await nukeChannels(guild, interaction.channelId);
        } else if (subcommand === "categories") {
            await nukeCategories(guild);
        } else if (subcommand === "roles") {
            await nukeRoles(guild);
        } else if (subcommand === "all") {
            await nukeChannels(guild, interaction.channelId);
            await nukeCategories(guild);
            await nukeRoles(guild);

            if (interaction.channel) {
                await interaction.channel.delete().catch(() => null);
                return;
            }
        }
    },
};
