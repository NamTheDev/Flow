import { PermissionsBitField } from "discord.js";
import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ApplicationCommandOptionType,
    MessageFlags,
} from "discord.js";

const OPTION_TYPES = ApplicationCommandOptionType as unknown as Record<
    number,
    string
>;

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription(
            "Displays all commands and options in a comprehensive tree layout.",
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const clientCommands = interaction.client.application?.commands.cache
            .size
            ? interaction.client.application.commands.cache
            : await interaction.client.application?.commands.fetch();

        if (!clientCommands || clientCommands.size === 0) {
            return interaction.reply({
                content: "No commands registered.",
                flags: MessageFlags.Ephemeral,
            });
        }

        let tree =
            "Slash Commands\n\n";

        for (const [, cmd] of clientCommands) {
            const defaultPerms = cmd.defaultMemberPermissions
                ? ` [Perms: ${new PermissionsBitField(cmd.defaultMemberPermissions.bitfield).toArray().join(", ") || "None"}]`
                : "";

            tree += `└── /${cmd.name}${defaultPerms} - "${cmd.description}"\n`;

            if (cmd.options && cmd.options.length > 0) {
                cmd.options.forEach((opt, optIndex, optArr) => {
                    const isLastOpt = optIndex === optArr.length - 1;
                    const optPrefix = isLastOpt ? "    └── " : "    ├── ";
                    const passPrefix = isLastOpt ? "        " : "    │   ";

                    if (
                        opt.type ===
                        ApplicationCommandOptionType.SubcommandGroup
                    ) {
                        tree += `${optPrefix}[Group] ${opt.name} - "${opt.description}"\n`;

                        if (opt.options && opt.options.length > 0) {
                            opt.options.forEach(
                                (subCmd, subCmdIndex, subCmdArr) => {
                                    const isLastSub =
                                        subCmdIndex === subCmdArr.length - 1;
                                    const subPrefix = isLastSub
                                        ? "└── "
                                        : "├── ";
                                    const subPassPrefix = isLastSub
                                        ? "    "
                                        : "│   ";

                                    tree += `${passPrefix}${subPrefix}/subcommand: ${subCmd.name} - "${subCmd.description}"\n`;

                                    if (
                                        subCmd.options &&
                                        subCmd.options.length > 0
                                    ) {
                                        subCmd.options.forEach(
                                            (
                                                subOpt,
                                                subOptIndex,
                                                subOptArr,
                                            ) => {
                                                const isLastSubOpt =
                                                    subOptIndex ===
                                                    subOptArr.length - 1;
                                                const subOptMarker =
                                                    isLastSubOpt
                                                        ? "└── "
                                                        : "├── ";
                                                const req = subOpt.required
                                                    ? "*"
                                                    : "";
                                                tree += `${passPrefix}${subPassPrefix}${subOptMarker}${subOpt.name}${req} (${OPTION_TYPES[subOpt.type]}) - "${subOpt.description}"\n`;
                                            },
                                        );
                                    }
                                },
                            );
                        }
                    } else if (
                        opt.type === ApplicationCommandOptionType.Subcommand
                    ) {
                        tree += `${optPrefix}/subcommand: ${opt.name} - "${opt.description}"\n`;

                        if (opt.options && opt.options.length > 0) {
                            opt.options.forEach(
                                (subOpt, subOptIndex, subOptArr) => {
                                    const isLastSubOpt =
                                        subOptIndex === subOptArr.length - 1;
                                    const subOptMarker = isLastSubOpt
                                        ? "└── "
                                        : "├── ";
                                    const req = subOpt.required ? "*" : "";
                                    tree += `${passPrefix}${subOptMarker}${subOpt.name}${req} (${OPTION_TYPES[subOpt.type]}) - "${subOpt.description}"\n`;
                                },
                            );
                        }
                    } else {
                        const req = opt.required ? "*" : "";
                        tree += `${optPrefix}${opt.name}${req} (${OPTION_TYPES[opt.type]}) - "${opt.description}"\n`;
                    }
                });
            }
            tree += "\n";
        }

        return interaction.reply({
            content: `\`\`\`bash\n${tree.substring(0, 1980)}\`\`\``,
        });
    },
};
