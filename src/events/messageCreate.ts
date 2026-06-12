import { Message } from "discord.js";

export = {
  name: "messageCreate",
  execute(message: Message) {
    if (message.author.bot) return;
    message.reply("Pong!");
  }
};
