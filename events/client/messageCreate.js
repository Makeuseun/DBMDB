const client = require('../../app')

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.channel.send(`> ***Hello ${message.author}! Use /help to see my commands.***`);
  }
});